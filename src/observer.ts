export type ObserverFn<T> = (t: T) => any;

import { Dict } from "./gen_utils";
let observers: Dict<ObserverFn<any>[]> = {};

export function observe<T>(key: string, f: ObserverFn<T>) {
    //console.log("observe: " + key);
    if (!observers[key]) observers[key] = [];
    observers[key].push(f);
}

export function publish<T>(key: string, t: T) {
    //console.log("publish: " + key);
    if (observers[key]) {
        observers[key].forEach((f) => f(t));
    }
}
