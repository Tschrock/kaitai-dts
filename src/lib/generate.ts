import type * as ksy from './schema';
import type { Lines } from './factory';
import type { Enum, Type, TypeRef } from './parse';

import { factory as $ } from './factory';
import { getTypeFromSchema, BuiltinType } from './parse'
import { toLowerCamel, toUpperCamel } from './util';

export function generateModuleFile(schema: ksy.KsySchema): string {
    const type = getTypeFromSchema(schema);
    return $.file("    ", [
        "// This file was auto-generated. If this file is regenerated, all changes will be lost.",
        "import KaitaiStream from 'kaitai-struct/KaitaiStream';",
        ...generateType(type, true)
    ]);
}

function generateType(type: Type, $export: boolean = false): Lines {
    return [
        ...generateClass(type, $export),
        ...generateNamespace(type, $export),
    ]
}

function generateClass(type: Type, $export: boolean): Lines {
    if (!type.properties.length && !type.getters.length) return [];

    return $.class(
        toUpperCamel(type.name),
        [
            ...type.properties.map(p => $.prop(toLowerCamel(p.name), resolveTypeRef(p.typeRef, type))),
            ...type.getters.map(p => $.getter(toLowerCamel(p.name), resolveTypeRef(p.typeRef, type))),
            'constructor(_io: KaitaiStream, _parent?: any, _root?: any);',
            '_read(): void;',
        ],
        $export
    );
}

function generateNamespace(type: Type, $export: boolean): Lines {
    if (!type.types.length && !type.enums.length) return [];

    return $.namespace(
        toUpperCamel(type.name),
        [
            ...type.enums.map(e => generateEnum(e)).flat(1),
            ...type.types.map(t => generateType(t)).flat(1),
        ],
        $export
    );
}

function generateEnum(enumDef: Enum): Lines {
    return $.enum(
        toUpperCamel(enumDef.name),
        enumDef.entries.map(e => $.enumItem(e.name.toUpperCase(), e.value))
    );
}

function resolveTypeRef(typeRef: TypeRef, scope: Type) {
    let type = Array.isArray(typeRef.value)
        ? $.union(typeRef.value.map(v => resolveType(v, scope)))
        : resolveType(typeRef.value, scope);

    if (typeRef.repeated) {
        type = $.generic("Array", [type]);
    }

    if (typeRef.conditional) {
        type = $.union([type, "undefined"]);
    }

    return type;
}

function resolveType(type: symbol | string, scope: Type): string {
    return typeof type === 'string'
        ? searchForType(type, scope).map(toUpperCamel).join(".")
        : typeFromBuiltin(type);
}

function typeFromBuiltin(symbol: symbol) {
    switch (symbol) {
        case BuiltinType.Boolean: return "boolean";
        case BuiltinType.Buffer: return "Uint8Array";
        case BuiltinType.Number: return "number";
        case BuiltinType.String: return "string";
        default: return "unknown"
    }
}

function searchForType(ref: string, tree: Type): string[] {
    if (tree.types.some(t => t.name === ref) || tree.enums.some(t => t.name === ref)) {
        return [tree.name, ref];
    }
    else {
        return [ref];
    }
}
