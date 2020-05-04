// A flat dictionary
export type Dict<T> = { [key: string]: T };

// A nested (recursive) dictionary
export type RDict<T> = { [key: string]: T | RDict<T> };

export function rdSafeGet<T>(o: RDict<T>, key: string | string[]): T | RDict<T> {
    if (!o) return undefined;
    if (Array.isArray(key)) {
        let _o: T | RDict<T> = o;
        for (let k of key) {
            if (typeof _o != "object") return undefined;
            if (!(k in _o)) return undefined;
            _o = o[k];
        }
        return _o;
    } else {
        let keys = key.split(".");
        if (keys.length == 1) return o[key];
        else return rdSafeGet<T>(o, keys);
    }
}
