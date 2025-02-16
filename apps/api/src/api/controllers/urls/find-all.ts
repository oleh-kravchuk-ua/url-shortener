import type { RequestHandler } from "express";

import { ioc } from "$infra/ioc";
import { orm } from "$infra/micro-orm";

import { TOKEN_USECASE_FIND_ALL_URLS } from "$usecase/find-all-urls";
import type { FindAllUrlsUsecase } from "$usecase/find-all-urls";

import { /*mapDataToResponse, */ mapErrorToResponse } from "$api/responses/urls";

import type { CustomError } from "$infra/errors";

import { createLogger } from "$logger";
const logger = createLogger({ prefix: "[Logger_controller_findAll]" });

export const findAll: RequestHandler = async (_req, res) => {
  const em = orm.em.fork();
  const usecaseFindAllUrls = ioc.get<FindAllUrlsUsecase>(TOKEN_USECASE_FIND_ALL_URLS);

  try {
    const { result } = await usecaseFindAllUrls.execute(em);
    res.status(200).json({ result });
  } catch (_error) {
    const error = _error as CustomError;
    const status = error.status || 500;
    const reason = error?.name || "Internal server error";

    const message = "Failed to get all created URLs";
    logger.withMetadata({ status, reason }).withError(error).error(message);
    res.status(status).json(mapErrorToResponse(error, message));
  }
};
