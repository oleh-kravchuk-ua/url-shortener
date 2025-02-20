import { describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import { getContentByUrl } from "$infra/http/undici";
import { checkUrlValidity, isUrl, toUrl } from "./url";

vi.mock("$infra/http/undici", () => ({
  getContentByUrl: vi.fn(),
}));

const url = "https://fake-url.com/";

describe("URL Utility Functions", () => {
  describe("toUrl", () => {
    it("Should return a URL object for a valid URL string", () => {
      const result = toUrl(url);
      expect(result).toBeInstanceOf(URL);
      expect(result?.href).toBe(url);
    });

    it("Should return undefined for an invalid URL string", () => {
      const invalidUrl = "invalid-url";
      const result = toUrl(invalidUrl);
      expect(result).toBeUndefined();
    });
  });

  describe("isUrl", () => {
    it("Should return true for a valid URL", () => {
      const result = isUrl(url);
      expect(result).toBe(true);
    });

    it("Should return false for an invalid URL", () => {
      const invalidUrl = "invalid-url";
      const result = isUrl(invalidUrl);
      expect(result).toBe(false);
    });
  });
});

describe("checkUrlValidity", () => {
  it("Should return true for a valid URL with successful response", async () => {
    (getContentByUrl as Mock).mockResolvedValue({
      status: 200,
    });

    const result = await checkUrlValidity(url);
    expect(result).toBe(true);
  });

  it("Should return false for a valid URL with a non-successful response", async () => {
    (getContentByUrl as Mock).mockResolvedValue({
      status: 404,
    });

    const result = await checkUrlValidity(url);
    expect(result).toBe(false);
  });

  it("Should return false for a URL that fails to fetch", async () => {
    (getContentByUrl as Mock).mockRejectedValue(new Error("Fetch error"));

    const result = await checkUrlValidity(url);
    expect(result).toBe(false);
  });
});
