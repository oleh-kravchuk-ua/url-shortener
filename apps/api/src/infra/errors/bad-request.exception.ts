import { ExceptionNames } from "./base";
import type { CustomError } from "./base";

export class BadRequestException extends Error implements CustomError {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = ExceptionNames.BadRequest;
    this.status = 400;
    Error.captureStackTrace(this, this.constructor);
  }
}
