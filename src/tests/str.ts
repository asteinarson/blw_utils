import { toCamelCase, toPascalCase, protoFromUrl } from "../str";

test("toCamelCase", () => {
    expect(toCamelCase("a_good_func")).toBe("aGoodFunc");
});

test("toPascalCase", () => {
    expect(toPascalCase("a_good_func")).toBe("AGoodFunc");
});

test("protoFromUrl", () => {
    expect(protoFromUrl("svn://")).toBe("svn");
});
