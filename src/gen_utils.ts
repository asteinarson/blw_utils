// A flat dictionary
export type Dict<T> = { [key: string]: T };

// A nested (recursive) dictionary
export type RDict<T> = { [key: string]: T | RDict<T> };

export function rdSafeGet<T>(
    o: RDict<T>,
    key: string | string[]
): T | RDict<T> {
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

export function tryThis<T>(f: () => T, default_val: any = null): T {
    try {
        return f();
    } catch (e) {
        return default_val == "__exception_value__" ? e : default_val;
    }
}

// function tryThis1(
//     f: (...args: any[]) => any,
//     args: any[],
//     default_val: any = null
// ) {
//     try {
//         return f(args);
//     } catch (e) {
//         return default_val == "__exception_value__" ? e : default_val;
//     }
// }
