import { Router } from "express";
import type { Express } from "express";

import { getFnValidateRequest } from "$api/validation/request";
import * as HealthcheckController from "$controller/healthcheck";

export const healthcheck = (app: Express) => {
  const healthcheckRouter = Router({ mergeParams: true, strict: true });

  healthcheckRouter.get("/", getFnValidateRequest("GET"), HealthcheckController.live);
  healthcheckRouter.get("/live", getFnValidateRequest("GET"), HealthcheckController.live);
  healthcheckRouter.get("/ready", getFnValidateRequest("GET"), HealthcheckController.ready);

  app.use("/healthcheck", healthcheckRouter);
};
