import { protoFromUrl } from "../str";

let p = protoFromUrl("svn://this.place//file");
console.log("proto: " + p);
