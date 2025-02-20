import { describe, expect, it } from "vitest";
import { generateShortHex } from "./random-hex";

const RE_PATTERN = /^[0-9a-f]+$/;

describe("Test cases of generateShortHex", () => {
  it("Should return a hex string of specified size", () => {
    const size = 4;
    const result = generateShortHex(size);
    expect(result).toHaveLength(size * 2);
    expect(result).toMatch(RE_PATTERN);
  });

  it("Should return a hex string of default size (4)", () => {
    const result = generateShortHex();
    expect(result).toHaveLength(8);
    expect(result).toMatch(RE_PATTERN);
  });

  it("Should generate different values when called multiple times", () => {
    const hexStrings = new Set();

    for (let i = 0; i < 100; i++) {
      hexStrings.add(generateShortHex(4));
    }

    expect(hexStrings.size).toBeGreaterThan(1);
  });

  it("Should handle larger sizes", () => {
    const size = 16;
    const result = generateShortHex(size);
    expect(result).toHaveLength(size * 2);
    expect(result).toMatch(RE_PATTERN);
  });
});
