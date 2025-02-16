import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { ErrorTitles } from "../error-titles";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const status = 400;
    res.status(status).json({
      status,
      title: ErrorTitles.VALIDATION_ERROR,
      errors: errors.array(),
    });
    return;
  }

  next();
};

export const getFnValidateRequest = (method = "GET") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== method.toUpperCase()) {
      const status = 405;
      res.status(status).json({
        status,
        title: ErrorTitles.VALIDATION_ERROR,
        errors: [{ reason: `Method ${req.method} Not Allowed` }],
      });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const status = 400;
      res.status(status).json({
        status,
        title: ErrorTitles.VALIDATION_ERROR,
        errors: errors.array(),
      });
      return;
    }

    next();
  };
};
