import * as u from "../utils";

test("isString", () => {
    expect(u.isString("word")).toBe(true);
    expect(u.isString(null)).toBe(false);
});

test("isNumber", () => {
    expect(u.isNumber("word")).toBe(false);
    expect(u.isNumber(3.22)).toBe(true);
});

test("isNumeric", () => {
    expect(u.isNumeric("word")).toBe(false);
    expect(u.isNumeric(3.22)).toBe(true);
    expect(u.isNumeric("-3.22")).toBe(true);
    expect(u.isNumeric({})).toBe(false);
    expect(u.isNumeric(NaN)).toBe(false);
});

test("isArray", () => {
    expect(u.isArray("word")).toBe(false);
    expect(u.isArray([3.1])).toBe(true);
    expect(u.isArray([])).toBe(true);
    expect(u.isArray({})).toBe(false);
});

test("isObject", () => {
    expect(u.isObject("word")).toBe(false);
    expect(u.isObject([2, 7])).toBe(true);
    expect(u.isObject([2, 7], true)).toBe(false);
    expect(u.isObject({})).toBe(true);
});

test("firstKey", () => {
    expect(u.firstKey({ c: 1, def: "abc" })).toBe("c");
    expect(u.firstKey({})).toBe(undefined);
    expect(u.firstKey(["abc"])).toBe("0");
});

test("isEmptyObject", () => {
    expect(u.isEmptyObject({ c: 1, def: "abc" })).toBe(false);
    expect(u.isEmptyObject({})).toBe(true);
    expect(u.isEmptyObject([])).toBe(false);
});

test("isEmptyArray", () => {
    expect(u.isEmptyArray([])).toBe(true);
    expect(u.isEmptyArray([2, 7])).toBe(false);
    expect(u.isEmptyArray({} as any)).toBe(false);
});

test("isEmpty", () => {
    expect(u.isEmpty([])).toBe(true);
    expect(u.isEmpty([2, 7])).toBe(false);
    expect(u.isEmpty({})).toBe(true);
    expect(u.isEmpty({ a: 2 })).toBe(false);
    expect(u.isEmpty(0)).toBe(true);
    expect(u.isEmpty(7.3)).toBe(false);
    expect(u.isEmpty("")).toBe(true);
    expect(u.isEmpty("aaa")).toBe(false);
    expect(u.isEmpty(false)).toBe(true);
    expect(u.isEmpty(true)).toBe(false);
});

test("aSum", () => {
    expect(u.aSum([{ b: 3 }, { b: 2.1 }], "b")).toBe(5.1);
    expect(u.aSum([{ b: 3 }, { c: 2.1 }], "b")).toBe(3);
    expect(u.aSum([1, 2, 3, 4])).toBe(10);
});

test("aTop", () => {
    expect(u.aTop(["abc", 14])).toBe(14);
    expect(u.aTop([])).toBe(undefined);
});

test("dateToNumbers", () => {
    let d = new Date(1987, 9, 13);
    expect(u.dateToNumbers(d)).toStrictEqual({
        year: 1987,
        month: 9,
        day_of_month: 13,
    });
    expect(u.dateTo10CharString(d)).toBe("1987-10-13");
    d = new Date(2014, 0, 4);
    expect(u.dateTo10CharString(d)).toBe("2014-01-04");
});

test("isEqual", () => {
    let o1: u.AnyObject = { a: 3, b: "abc" };
    let o2: u.AnyObject = { a: 3, b: "abc", x: 14 };
    expect(u.isEqual(o1, o2)).toBe(false);
    delete o2.x;
    expect(u.isEqual(o1, o2)).toBe(true);

    o1.sub = [1, 3, 7];
    o2.sub = [];
    expect(u.isEqual(o1, o2)).toBe(false);
    o2.sub = [1, 3, 7];
    expect(u.isEqual(o1, o2)).toBe(true);
    o2.sub.push({});
    expect(u.isEqual(o1, o2)).toBe(false);
    delete o1.sub;
    o2.sub = [];
    expect(u.isEqual(o1, o2)).toBe(false);
    expect(u.isEqual([], o2)).toBe(false);
    expect(u.isEqual([], null)).toBe(false);
    expect(u.isEqual([], {})).toBe(true);
});
