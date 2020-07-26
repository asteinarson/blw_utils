import * as fs from "fs";
import * as path from "path";

import { errorLog } from "./error";

export function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        let r = fs.mkdirSync(dir);
        if (!fs.existsSync(dir))
            return errorLog("Failed creating directory: " + dir, null, 1);
    }
}

export function findDirWith(file: string, from?: string) {
    if (!from) from = process.cwd();
    while (true) {
        if (fs.existsSync(from + "/" + file))
            return path.normalize(from + "/" + file);
        if (path.normalize(from) == "/") return null;
        from += "/..";
    }
}

// Borrowed from https://coderrocketfuel.com/article/remove-both-empty-and-non-empty-directories-using-node-js
export function removeDirSync(path: string) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);

        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(path + "/" + filename).isDirectory()) {
                    removeDirSync(path + "/" + filename);
                } else {
                    fs.unlinkSync(path + "/" + filename);
                }
            });
            fs.rmdirSync(path);
        } else {
            fs.rmdirSync(path);
        }
    } else {
        return errorLog("Directory path not found.", null, 1);
    }
}
