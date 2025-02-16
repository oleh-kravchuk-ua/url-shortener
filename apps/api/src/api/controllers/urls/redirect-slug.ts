import type { RequestHandler } from "express";
import { matchedData } from "express-validator";

import { runInTransaction } from "$helper/run-in-tx";

import { getUsecaseOperation } from "$usecase/get-usecase";

import { RedirectBySlugValidationKey, TOKEN_USECASE_REDIRECT_BY_SLUG } from "$usecase/redirect-by-slug";
import type { InputData, OutputData, RedirectBySlugUsecase } from "$usecase/redirect-by-slug";

import { mapDataToResponse, mapErrorToResponse } from "$api/responses/urls";

import { BadRequestException, InternalServerException } from "$infra/errors";
import type { CustomError } from "$infra/errors";

import { createLogger } from "$logger";
const logger = createLogger({ prefix: "[Logger_controller_redirectBySlug]" });

const checkValidationKey = (output: OutputData): void => {
  switch (output.validationKey) {
    case RedirectBySlugValidationKey.MALFORMED_INPUT_DATA:
      throw new BadRequestException("Malformed request data. Value 'slug' should be valid");
    case RedirectBySlugValidationKey.NOT_FOUND:
      throw new BadRequestException("URL is not found by the requested slug value");
    case RedirectBySlugValidationKey.NOT_VALID_URL:
      throw new InternalServerException("Found url is not valid");
    case RedirectBySlugValidationKey.BROKEN_LINK:
      throw new BadRequestException("Provided slug leads to a broken link");
    default:
    // Do nothing
  }
};

export const redirectBySlug: RequestHandler = async (req, res) => {
  const { slug } = matchedData(req);
  const operation = getUsecaseOperation<RedirectBySlugUsecase>(TOKEN_USECASE_REDIRECT_BY_SLUG);

  try {
    const output = await runInTransaction<InputData, OutputData>(operation, { slug });
    checkValidationKey(output);

    const entity = output.result;

    if (!entity?.originalUrl) {
      const message = "Unexpected result. `originalUrl` not found";
      logger.withMetadata({ slug }).error(message);
      res.status(404).json(mapErrorToResponse(new InternalServerException(message)));
      return;
    }

    const status = 200;

    logger.withMetadata({ status, slug, originalUrl: entity.originalUrl }).info("Redirected succesfully with slug");

    res.status(status).json(mapDataToResponse(status, entity));
    return;
  } catch (_error) {
    const error = _error as CustomError;
    const status = error.status || 500;
    const reason = error?.name || "Internal server error";

    const message = "Failed to redirect by slug";
    logger.withMetadata({ slug, status, reason }).withError(error).error(message);

    res.status(status).json(mapErrorToResponse(error, message));
  }
};
