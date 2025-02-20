import { orm } from "$infra/micro-orm";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { runInTransaction } from "./run-in-tx";

const dataset = { some: "data" };

vi.mock("$infra/micro-orm", () => ({
  orm: {
    em: {
      fork: vi.fn(),
    },
  },
}));

describe("runInTransaction", () => {
  const mockEm = {
    begin: vi.fn(),
    commit: vi.fn(),
    rollback: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (orm.em.fork as Mock).mockReturnValue(mockEm);
  });

  it("Should commit the transaction on success", async () => {
    const mockOperation = vi.fn().mockResolvedValue("result");

    const result = await runInTransaction(mockOperation, dataset);

    expect(mockEm.begin).toHaveBeenCalled();
    expect(mockEm.commit).toHaveBeenCalled();
    expect(mockEm.rollback).not.toHaveBeenCalled();
    expect(result).toBe("result");
    expect(mockOperation).toHaveBeenCalledWith(mockEm, dataset);
  });

  it("Should rollback the transaction on error", async () => {
    const mockOperation = vi.fn().mockRejectedValue(new Error("Operation failed"));

    await expect(runInTransaction(mockOperation, dataset)).rejects.toThrow("Operation failed");

    expect(mockEm.begin).toHaveBeenCalled();
    expect(mockEm.commit).not.toHaveBeenCalled();
    expect(mockEm.rollback).toHaveBeenCalled();
  });
});
