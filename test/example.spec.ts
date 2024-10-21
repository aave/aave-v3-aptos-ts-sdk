import { ZERO_ADDRESS } from "../src/helpers/constants";

describe("Test", () => {
  describe("test", () => {
    test("test", () => {
      expect([1]).toHaveLength(1);
      expect(ZERO_ADDRESS.toString()).toEqual("0x0");
    });
  });
});
