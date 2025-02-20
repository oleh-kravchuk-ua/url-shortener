import { fetch } from "undici";
import type { Response } from "undici";

import { ExternalServiceException, TimeoutException } from "$infra/errors";
import { logger } from "$logger";

const DEFAULT_TIMEOUT = 5000;

export const getContentByUrl = async (url: string, timeout = DEFAULT_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(
    () => {
      controller.abort();
    },
    timeout > 0 ? timeout : DEFAULT_TIMEOUT,
  );

  try {
    const response = await fetch(url, { method: "GET", signal });

    logger
      .withMetadata({
        url,
        status: response?.status,
      })
      .debug("Received external content");

    return response;
  } catch (_error) {
    const error = _error as Error;

    if (error.name === "AbortError") {
      const customError = new TimeoutException(`Request to ${url} was aborted: Timeout of ${timeout} ms exceeded`);
      logger.error(`${customError.message}. Original reason: ${error.message} Error name: ${error.name}`);
      throw customError;
    }

    const customError = new ExternalServiceException(`${error.message}`, 500);
    logger.error(`Failed to GET: ${url}. Error: ${customError.message}`);
    throw customError;
  } finally {
    clearTimeout(timeoutId);
  }
};
