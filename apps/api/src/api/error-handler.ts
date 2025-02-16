import type { ErrorRequestHandler, Express, Request } from "express";

import { logger } from "$infra/logger";

import { isProduction } from "$config/enviroment";

import { ErrorTitles } from "./error-titles";

interface IPInfo {
  ip: string;
  isLikelyVPN: boolean;
}

const MESSAGE_INTERNAL_ERROR = "Internal Server Error";

export const setupErrorHandler = (app: Express) => {
  app.use(errorHandler);
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error) {
    const { ip, isLikelyVPN } = getClientIPInfo(req);

    logger.withError(error).error(`Error from IP ${ip} ${isLikelyVPN ? "(likely VPN)" : ""}:`);

    const status = isProduction ? 500 : error.status || 500;

    res.status(status).json({
      status,
      title: ErrorTitles.EXECUTION_ERROR,
      errors: [
        {
          status,
          reason: isProduction ? MESSAGE_INTERNAL_ERROR : error.message || MESSAGE_INTERNAL_ERROR,
        },
      ],
    });
  } else {
    next();
  }
};

const getClientIPInfo = (req: Request): IPInfo => {
  const forwarded = req.headers["x-forwarded-for"];

  const ip =
    (typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : Array.isArray(forwarded)
        ? forwarded[0]?.trim()
        : req.ip) || "unknown IP";

  const isLikelyVPN = checkForVPNIndicators(req);

  return { ip, isLikelyVPN };
};

const checkForVPNIndicators = (req: Request): boolean =>
  [req.headers["proxy-connection"], req.headers["x-vpn"], req.headers.via].some(Boolean);
