import { expect, test, describe, beforeEach } from "vitest";
import { NftBitmapClient } from "./client";
import { Algodv2 } from "algosdk";

describe("NftBitmapClient", () => {
  let nftBitmapClient: NftBitmapClient;
  beforeEach(() => {
    nftBitmapClient = new NftBitmapClient(
      {
        resolveBy: "id",
        id: 0,
      },
      new Algodv2("", "http://localhost", 4001),
    );
  });

  test("constructor", () => {
    expect(nftBitmapClient).toBeDefined();
  });
});
