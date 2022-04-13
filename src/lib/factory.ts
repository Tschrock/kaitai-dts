import { flatMap, unique } from "./util";

export type Lines = Array<string | Lines>;

function l(strings: TemplateStringsArray, ...values: Lines): Lines {
    const lines: Lines = [];
    let stack = strings[0];
    for (let i = 0; i < values.length; ++i) {
        const val = values[i];
        if (Array.isArray(val)) {
            lines.push(stack, val);
            stack = "";
        }
        else {
            const parts = val.split('\n');
            stack += parts[0];
            for (let i = 1; i < parts.length; ++i) {
                lines.push(stack);
                stack = parts[i];
            }
        }
        stack += strings[i + 1];
    }
    lines.push(stack);
    return lines;
}

export const factory = {
    // Inline
    prop: (name: string, type: string) => `${name}: ${type};`,
    param: (name: string, type: string) => `${name}: ${type}`,
    method: (name: string, params: string[], type: string) => `${name}(${params.join(', ')}): ${type};`,
    getter: (name: string, type: string) => `get ${name}(): ${type};`,
    setter: (name: string, type: string) => `set ${name}(): ${type};`,
    union: (types: string[]) => unique(types).join(' | '),
    generic: (type: string, p: string[]) => `${type}<${p.join(', ')}>`,
    enumItem: (name: string, value: string | number) => `${name} = ${JSON.stringify(value)},`,
    // Multiline
    module: (name: string, content: Lines) => l`declare module ${JSON.stringify(name)} {${content}}`,
    namespace: (name: string, content: Lines, $export = false) => l`${$export ? "export " : ""}namespace ${name} {${content}}`,
    class: (name: string, content: Lines, $export = false) => l`${$export ? "export " : ""}class ${name} {${content}}`,
    enum: (name: string, content: Lines) => l`enum ${name} {${content}}`,
    // Extras
    file: (indent: string, content: Lines) => flatMap(content, (l, d) => indent.repeat(d) + l).join('\n')
};
