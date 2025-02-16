import type { RequestHandler } from "express";

import { ErrorTitles } from "../../error-titles";

export class NotFoundController {
  public handle: RequestHandler = async (_req, res) => {
    const status = 404;
    res
      .status(status)
      .json({ status, title: ErrorTitles.UNDEFINED_ENPOINT, errors: [{ status, reason: "Undefined REST-endpoint" }] });
  };
}
