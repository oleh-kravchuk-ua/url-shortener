import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import * as Controller from "$controller/urls";

import { validationOriginalUrl } from "$api/validation/schema/original-url";
import { validationSlug } from "$api/validation/schema/slug";

import { getFnValidateRequest } from "$api/validation/request";

const urlsRouter: ExpressRouter = Router({ mergeParams: true, strict: true });

urlsRouter.get("/", getFnValidateRequest("GET"), Controller.findAll);
urlsRouter.get("/:slug", validationSlug(), getFnValidateRequest("GET"), Controller.redirectBySlug);
urlsRouter.post("/shorten", validationOriginalUrl(), getFnValidateRequest("POST"), Controller.shortenUrl);

export { urlsRouter };
