import { ExceptionNames } from "./base";
import type { CustomError } from "./base";

export class ExternalServiceException extends Error implements CustomError {
  public status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = ExceptionNames.ExternalService;
    this.status = status || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
