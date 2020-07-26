import * as fs from "fs";
import { errorLog } from "./error";

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
