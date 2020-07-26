import * as fs from "fs";
import _ from "lodash";
import { errorLog } from "./error";

export function readJsonField(
    json_file: string,
    field: string | string[],
    default_value: any = undefined
) {
    // Read package.json
    try {
        let json_text = fs.readFileSync(json_file);
        let json = JSON.parse(json_text.toString());
        return _.get(json, field);
    } catch (e) {
        let r = default_value === undefined ? 1 : default_value;
        return errorLog("Failed readJsonField of: " + json_file, "" + e, r);
    }
}

export function writeJsonField(
    json_file: string,
    field: string | string[],
    value: any
) {
    // Read package.json
    try {
        let json_text = fs.readFileSync(json_file);
        let json = JSON.parse(json_text.toString());
        _.set(json, field, value);
        fs.writeFileSync(json_file, JSON.stringify(json, null, 4));
    } catch (e) {
        return errorLog("Failed writeJsonField of: " + json_file, "" + e, 1);
    }
}

export function dropJsonField(json_file: string, field: string | string[]) {
    // Read package.json
    try {
        let json_text = fs.readFileSync(json_file);
        let json = JSON.parse(json_text.toString());
        if (Array.isArray(field)) {
            if (!field.length) return;
            let parent = _.get(json, field.slice(0, field.length - 1));
            let key = field.pop();
            delete parent[key as string];
        } else {
            delete json[field];
        }
        fs.writeFileSync(json_file, JSON.stringify(json, null, 4));
    } catch (e) {
        return errorLog("Failed writeJsonField of: " + json_file, "" + e, 1);
    }
}
