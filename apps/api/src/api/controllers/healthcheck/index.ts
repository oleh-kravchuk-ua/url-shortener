import type { RequestHandler } from "express";

import { orm } from "$infra/micro-orm";

import { logger } from "$logger";

export const ready: RequestHandler = async (_req, res) => {
  try {
    if (!(await orm?.isConnected())) {
      logger.warn("ORM connection is not established");
      const status = 503;
      res.status(status).json({
        data: { status: status, type: "healthcheck/ready", success: false, message: "Service is not ready" },
      });
      return;
    }
  } catch (error) {
    logger.withError(error).warn("Failed to check the connection with DB");
    const status = 500;
    res.status(status).json({
      data: { status: status, type: "healthcheck/ready", success: false, message: "Failed to check readiness" },
    });
    return;
  }

  const status = 200;
  res.status(status).json({
    data: { status, type: "healthcheck/ready", success: true, message: "Server is ready to accept requests" },
  });

  return;
};

export const live: RequestHandler = async (_req, res) => {
  const status = 200;
  res
    .status(status)
    .json({ data: { status, type: "healthcheck/live", success: true, message: "Server is up and running" } });

  return;
};
