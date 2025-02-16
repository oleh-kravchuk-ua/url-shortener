export const repeatUntilAsync = async (
  conditionFn: () => boolean,
  actionFn: () => Promise<void>,
  errorHandler?: (error: Error) => void,
): Promise<void> => {
  if (errorHandler) {
    while (!conditionFn()) {
      try {
        await actionFn();
      } catch (error) {
        errorHandler(error as Error);
      }
    }
  } else {
    while (!conditionFn()) {
      await actionFn();
    }
  }
};
