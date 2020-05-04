export function toCamelCase(s: string) {
    let parts = s.split("_");
    parts[0] = parts[0][0].toLowerCase() + parts[0].slice(1);
    let r = parts[0];
    for (let ix = 1; ix < parts.length; ix++) {
        r += parts[ix][0].toUpperCase() + parts[ix].slice(1);
    }
    return r;
}

export function toPascalCase(s: string) {
    let parts = s.split("_");
    let r = "";
    for (let ix = 0; ix < parts.length; ix++) {
        r += parts[ix][0].toUpperCase() + parts[ix].slice(1);
    }
    return r;
}

let proto_re = new RegExp("^(\\w+)://");
export function protoFromUrl(url: string) {
    let r = proto_re.exec(url);
    return r && r.length > 0 ? r[1] : "";
}
