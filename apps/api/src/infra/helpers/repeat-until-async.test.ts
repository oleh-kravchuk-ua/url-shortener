import { describe, expect, it, vi } from "vitest";
import { repeatUntilAsync } from "./repeat-until-async";

describe("Test cases of repeatUntilAsync", () => {
  it("Should repeatedly call actionFn until conditionFn is true", async () => {
    const conditionFn = vi.fn();
    const actionFn = vi.fn().mockImplementationOnce(() => Promise.resolve());

    conditionFn.mockReturnValueOnce(false).mockReturnValueOnce(true);

    await repeatUntilAsync(conditionFn, actionFn);

    expect(conditionFn).toHaveBeenCalledTimes(2);
    expect(actionFn).toHaveBeenCalledTimes(1);
  });

  it("Should invoke errorHandler when actionFn throws an error", async () => {
    const conditionFn = vi.fn().mockReturnValue(false);
    const actionFn = vi.fn().mockRejectedValue(new Error("Test Error"));
    const errorHandler = vi.fn();

    await repeatUntilAsync(conditionFn, actionFn, errorHandler);

    expect(conditionFn).toHaveBeenCalled();
    expect(actionFn).toHaveBeenCalled();
    expect(errorHandler).toHaveBeenCalledWith(expect.any(Error));
  });

  it("Should not invoke errorHandler when actionFn resolves", async () => {
    const conditionFn = vi.fn();
    const actionFn = vi.fn().mockImplementationOnce(() => Promise.resolve());

    conditionFn.mockReturnValueOnce(false).mockReturnValueOnce(true);

    await repeatUntilAsync(conditionFn, actionFn, undefined);

    expect(conditionFn).toHaveBeenCalledTimes(2);
    expect(actionFn).toHaveBeenCalledTimes(1);
  });
});
