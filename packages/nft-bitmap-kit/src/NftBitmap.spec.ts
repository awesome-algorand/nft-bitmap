import { expect, test, describe, beforeEach } from "vitest";
import { NftBitmap } from "./NftBitmap.algo";
const data: { [k: number]: string } = {};

// @ts-expect-error, we are mocking the global state
globalThis.GlobalStateMap = function () {
  return function (key: number) {
    return {
      set value(value: string) {
        data[key] = value;
      },
      get value() {
        return data[key];
      },
    };
  };
};
// @ts-expect-error, we are mocking the assert function
globalThis.assert = function (statment: boolean) {
  if (!statment) {
    throw new Error("Assertion Failed");
  }
};

// @ts-expect-error, we are mocking the globals
globalThis.globals = {
  creatorAddress: "WALLETADDRESS",
};

// @ts-expect-error, mocking extract3
globalThis.extract3 = function (str: string, x: number, y: number) {
  return str.slice(x, x + y);
};
// @ts-expect-error, mocking concat
globalThis.concat = function (a: string, b: string) {
  return a + b;
};
globalThis.len = function (str: string) {
  return str.length;
};
// @ts-expect-error, mocking getbyte
globalThis.getbyte = function (str: string, x: number) {
  return str[x];
};
// @ts-expect-error, mocking substring3
globalThis.substring3 = function (str: string, x: number, y: number) {
  return str.slice(x, y);
};
describe("NftBitmap", () => {
  let nftBitmap: NftBitmap;
  beforeEach(() => {
    nftBitmap = new NftBitmap();
    nftBitmap.txn = {
      sender: "WALLETADDRESS" as unknown as Address,
    } as ThisTxnParams;
    nftBitmap.createApplication();
  });
  test("createApplication", () => {
    expect(nftBitmap.image(0).value).toEqual(
      "01020304050607080910111213141516171819202122232425262728293031323130292827262524",
    );
  });
  test("updateApplication", () => {
    expect(() => {
      nftBitmap.updateApplication();
    }).not.toThrow();
  });
  test("deleteApplication", () => {
    expect(() => {
      nftBitmap.deleteApplication();
    }).not.toThrow();
  });
  test("itoa", () => {
    expect(nftBitmap.itoa(0)).toEqual("0");
  });
  test.skip("atoi", () => {
    expect(nftBitmap.atoi("1")).toEqual(1);
  });
  test("placeRow", () => {
    const row =
      "01020304050607080910111213141516171819202122232425262728293031323130292827262524";
    expect(() => {
      nftBitmap.placeRow(0, row);
    }).not.toThrow();
    expect(nftBitmap.image(0).value).toEqual(row);
  });
  test("place", () => {
    expect(() => {
      nftBitmap.place(1, 1, 1);
    }).not.toThrow();
  });
  test.skip("get", () => {
    expect(() => {
      nftBitmap.get(2, 2);
    }).not.toThrow();
  });
});
