import { ExceptionNames } from "./base";
import type { CustomError } from "./base";

export class TimeoutException extends Error implements CustomError {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = ExceptionNames.Timeout;
    this.status = 408;
    Error.captureStackTrace(this, this.constructor);
  }
}
