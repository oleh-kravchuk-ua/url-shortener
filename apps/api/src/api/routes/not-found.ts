import type { Express } from "express";

import { NotFoundController } from "$controller/not-found";

const controllerNotFound = new NotFoundController();

export const notFound = (app: Express) => app.use(controllerNotFound.handle);
