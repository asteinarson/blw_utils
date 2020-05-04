import { isEmptyObject, isEmpty } from "./utils.js";
import { Dict } from "./gen_utils.js";

let promises: Dict<Promise<any>> = {};

export function pushPromise<T>(key: string, p: Promise<T>) {
    if (promises[key]) {
        let msg = "Slot already taken";
        console.log(msg);
        throw msg;
    }
    console.log("pushPromise: " + key);
    promises[key] = p;

    // Remove from array of pending ones, when done
    p.then((r) => {
        console.log("then: " + key);
        delete promises[key];
    }).catch((r) => {
        console.log("catch: " + key);
        delete promises[key];
    });
    return p;
}

export async function waitAll(): Promise<any> {
    return Promise.all(Object.values(promises)).then((r) => {
        // Did we have any new promises generated?
        if (!isEmptyObject(promises)) {
            console.log("waitAll - nested entry");
            return waitAll();
        }
    });
}
