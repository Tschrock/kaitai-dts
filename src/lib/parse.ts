import type * as ksy from './schema';

export interface Type {
    name: string
    properties: Property[]
    getters: Getter[]
    types: Type[]
    enums: Enum[]
    parent?: Type
}

export interface Getter {
    name: string
    typeRef: TypeRef
}

export interface Property {
    name: string
    typeRef: TypeRef
}

export interface Enum {
    name: string
    entries: EnumEntry[]
}

export interface EnumEntry {
    name: string
    value: string | number
}

export interface TypeRef {
    repeated: boolean
    conditional: boolean
    value: symbol | string | (string | symbol)[]
}

export const BuiltinType = {
    String: Symbol("string"),
    Buffer: Symbol("buffer"),
    Boolean: Symbol("boolean"),
    Number: Symbol("number"),
    Unknown: Symbol("unknown"),
}

export function getTypeFromSchema(schema: ksy.KsySchema): Type {
    if (!schema.meta) throw new TypeError("schema.meta is undefined");
    if (!schema.meta.id) throw new TypeError("schema.meta.id is undefined");

    // TODO: handle types for schema.meta.imports
    return parentify({
        name: schema.meta.id,
        types: getTypes(schema.types),
        enums: getEnums(schema.enums),
        properties: getAttributes(schema.seq),
        getters: getInstances(schema.instances),
    })
}

function getAttributes(attributes: ksy.Attribute[] = []): Property[] {
    return attributes.map(getAttribute);
}

function getAttribute(attribute: ksy.Attribute): Property {
    return {
        name: attribute.id,
        typeRef: getTypeRef(attribute),
    }
}

function getInstances(attributes: Record<string, ksy.Attribute> = {}): Getter[] {
    return Object.entries(attributes).map(getInstance);
}

function getInstance([id, attribute]: [string, ksy.Attribute]): Getter {
    return {
        name: id, // attribute.id is ignored
        typeRef: getTypeRef(attribute),
    }
}

function getTypes(types: Record<string, ksy.TypeSpec> = {}): Type[] {
    return Object.entries(types).map(getType);
}

function getType([id, attribute]: [string, ksy.TypeSpec]): Type {
    return {
        name: id,
        properties: getAttributes(attribute.seq),
        getters: getInstances(attribute.instances),
        types: getTypes(attribute.types),
        enums: getEnums(attribute.enums),
    }
}

function getEnums(enums: Record<string, Record<string, string | ksy.VerboseEnum>> = {}): Enum[] {
    return Object.entries(enums).map(getEnum);
}

function getEnum([id, entries]: [string, Record<string, string | ksy.VerboseEnum>]): Enum {
    return {
        name: id,
        entries: getEnumEntries(entries),
    }
}

function getEnumEntries(entries: Record<string, string | ksy.VerboseEnum> = {}): EnumEntry[] {
    return Object.entries(entries).map(getEnumEntry);
}

function getEnumEntry([value, id]: [string, string | ksy.VerboseEnum]): EnumEntry {
    return {
        name: getEnumName(id),
        value: getEnumValue(value),
    }
}

function getEnumName(id: string | ksy.VerboseEnum): string {
    return typeof id === "string" ? id : id.id;
}

const integerRegex = /^[0-9]+$/;
function getEnumValue(value: string): string | number {
    return integerRegex.test(value) ? Number.parseInt(value) : value;
}

function getTypeRef(attribute: ksy.Attribute): TypeRef {
    return {
        repeated: !!attribute.repeat,
        conditional: !!attribute.if,
        value: attribute.enum
            ? attribute.enum
            : attribute.type
                ? typeof attribute.type === 'string'
                    ? resolveType(attribute.type)
                    : Object.values(attribute.type.cases).map(resolveType)
                : (attribute.contents || attribute.size || attribute['size-eos'])
                    ? BuiltinType.Buffer
                    : BuiltinType.Unknown
    }
}

const intTypeRegex = /^([us])(2|4|8)(le|be)?$/;
const floatTypeRegex = /^f(4|8)(le|be)?$/;
const bitTypeRegex = /^b(\d+)(le|be)?$/;

function resolveType(value: string): string | symbol {
    switch (value) {
        case 'str':
        case 'strz':
            return BuiltinType.String;
        case 's1':
        case 'u1':
            return BuiltinType.Number;
        default:
            if (intTypeRegex.test(value)) {
                return BuiltinType.Number;
            }
            else if (floatTypeRegex.test(value)) {
                return BuiltinType.Number;
            }
            else if (bitTypeRegex.test(value)) {
                return BuiltinType.Boolean;
            }
    }
    return value;
}

function parentify(type: Type, parent?: Type) {
    type.parent = parent;
    type.types.forEach(t => parentify(t, type))
    return type;
}
