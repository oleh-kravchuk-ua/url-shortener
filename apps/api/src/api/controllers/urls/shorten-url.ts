import type { RequestHandler } from "express";
import { matchedData } from "express-validator";

import { runInTransaction } from "$helper/run-in-tx";

import { getUsecaseOperation } from "$usecase/get-usecase";

import { GenerateShortUrlValidationKey, TOKEN_USECASE_GENERATE_SHORT_URL } from "$usecase/genereate-short-url";
import type { IGenerateShortUrlUsecase, InputData, OutputData } from "$usecase/genereate-short-url";

import { mapDataToResponse, mapErrorToResponse } from "$api/responses/urls";

import { BadRequestException, InternalServerException } from "$infra/errors";
import type { CustomError } from "$infra/errors";

import { createLogger } from "$logger";
const logger = createLogger({ prefix: "[Logger_controller_shortenUrl]" });

const checkValidationKey = (output: OutputData): void => {
  switch (output.validationKey) {
    case GenerateShortUrlValidationKey.MALFORMED_INPUT_DATA:
      throw new BadRequestException("Malformed request data. Value 'originalUrl' should be a real URL");
    default:
    // Do nothing
  }
};

export const shortenUrl: RequestHandler = async (req, res) => {
  const { originalUrl } = matchedData(req);
  const operation = getUsecaseOperation<IGenerateShortUrlUsecase>(TOKEN_USECASE_GENERATE_SHORT_URL);

  try {
    const output = await runInTransaction<InputData, OutputData>(operation, { originalUrl });
    checkValidationKey(output);

    const entity = output.result;

    if (!entity) {
      logger.withMetadata({ originalUrl }).error("URL entity is not obtainer");
      throw new InternalServerException("Unexpected result");
    }

    logger
      .withMetadata({ originalUrl, shortenUrl: entity.shortUrl, slug: entity.slug })
      .info("URL `originalUrl` shortened successfully");

    const status = 200;
    res.status(status).json(mapDataToResponse(status, entity));
  } catch (_error) {
    const error = _error as CustomError;
    const status = error.status || 500;
    const reason = error?.name || "Internal server error";

    const message = "Failed to shorten URL 'originalUrl'";
    logger.withMetadata({ originalUrl, status, reason }).withError(error).error(message);
    res.status(status).json(mapErrorToResponse(error, message));
  }
};
