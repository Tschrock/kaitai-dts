export interface KsySchema extends TypeSpec {
    meta: MetaSpec & { id: string }
}

export interface TypeSpec {
    meta?: MetaSpec
    doc?: string
    "doc-ref"?: string | string[]
    params?: ParamSpec[]
    seq?: Attribute[]
    types?: Record<string, TypeSpec>
    enums?: Record<string, Record<string, string | VerboseEnum>>
    instances?: Record<string, Attribute>
}

export interface MetaSpec {
    id?: string
    title?: string
    application?: string | string[]
    "file-extension"?: string | string[]
    xref?: Record<string, Primitive | Primitive[]>
    license?: string
    "ks-version"?: string | number
    "ks-debug"?: boolean
    "ks-opaque-types"?: boolean
    imports?: string[]
    encoding?: string
    endian?: Endianness | Case<Endianness>
}

export type Primitive = string | number | boolean | null

export type Endianness = "le" | "be"

export interface Case<T> {
    "switch-on": Primitive
    cases: Record<string, T>
}

export interface ParamSpec {
    id: string
    type?: string
    doc?: string
    "doc-ref"?: string | string[]
    enum?: string
}

export interface Attribute {
    id: string
    doc?: string
    "doc-ref"?: string | string[]
    contents?: string | (string | number)[]
    type?: string | Case<string>
    repeat?: "expr" | "eos" | "until"
    "repeat-expr"?: string | number
    "repeat-until"?: string | boolean
    if?: string | boolean
    size?: string | number
    "size-eos"?: boolean
    process?: string
    enum?: string
    encoding?: string
    "pad-right"?: number
    terminator?: number
    consume?: boolean
    include?: boolean
    "eos-error"?: boolean
    pos?: string | number
    io?: string
    value?: unknown
}

export type EnumValues = Record<string, string | VerboseEnum>

export interface VerboseEnum {
    id: string
    doc?: string
    "doc-ref"?: string | string[]
    "-orig-id"?: string
}
