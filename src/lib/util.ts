export type Deep<T> = Array<T | Deep<T>>;

export const toUpperCamel = (value: string) => value.replace(/(?:^|_)+(.?)/g, (_, c = "") => c.toUpperCase());
export const toLowerCamel = (value: string) => value.replace(/^_*|_+(.?)/g, (_, c = "") => c.toUpperCase());
export const unique = <T>(values: T[]) => Array.from(new Set(values).values());

export function flatMap<T, U>(content: Deep<T>, mapper: (value: T, depth: number) => U, depth = 0): U[] {
    let rtn: U[] = [];
    for(const val of content) {
        if(Array.isArray(val)) {
            rtn = rtn.concat(flatMap(val, mapper, depth + 1))
        }
        else {
            rtn.push(mapper(val, depth));
        }
    }
    return rtn;
}
