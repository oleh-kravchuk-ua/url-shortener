import { fetch } from "undici";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import { ExternalServiceException, TimeoutException } from "$infra/errors";
import { logger } from "$logger";

import { getContentByUrl } from "./";

vi.mock("undici", () => ({
  fetch: vi.fn(),
}));

vi.mock("$logger", () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn(),
    withMetadata: vi.fn().mockReturnThis(),
  },
}));

const mockLogger = logger;

const url = "https://fake.com";

describe("Suite cases for getContentByUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should successfully fetch content and log debug message", async () => {
    const mockResponse = { status: 200, ok: true } as Response;

    (fetch as Mock).mockResolvedValue(mockResponse);

    const response = await getContentByUrl(url);
    expect(response).toBe(mockResponse);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, { method: "GET", signal: expect.any(AbortSignal) });
    expect(response).toBe(mockResponse);

    expect(mockLogger.debug).toHaveBeenCalledWith("Received external content");
    expect(mockLogger.withMetadata).toHaveBeenCalledWith({
      url,
      status: mockResponse.status,
    });
  });

  it("Should handle network error and log error", async () => {
    const errorMessage = "Network error";
    const error = new Error(errorMessage);

    (fetch as Mock).mockRejectedValue(error);

    await expect(getContentByUrl(url)).rejects.toThrow(ExternalServiceException);
    expect(mockLogger.error).toHaveBeenCalledWith(`Failed to GET: ${url}. Error: ${errorMessage}`);
  });

  it("Should handle a timeout and log error", async () => {
    const timeout = 1;
    const errorMessage = "Timeout exception";
    const error = new Error(errorMessage);
    error.name = "AbortError";

    (fetch as Mock).mockRejectedValue(error);

    await expect(getContentByUrl(url, timeout)).rejects.toThrow(TimeoutException);
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining(`Request to ${url} was aborted: Timeout of ${timeout} ms exceeded`),
    );
  });
});
