import { ExceptionNames } from "./base";
import type { CustomError } from "./base";

export class InternalServerException extends Error implements CustomError {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = ExceptionNames.InternalServer;
    this.status = 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
