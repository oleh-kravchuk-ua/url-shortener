import { ExceptionNames } from "./base";
import type { CustomError } from "./base";

export class ConflictException extends Error implements CustomError {
  public status: number;

  public details?: string;

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  public found?: Object;

  constructor(
    message: string,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    { details, found }: { details?: string; found?: Object },
  ) {
    super(message);

    this.name = ExceptionNames.Conflict;
    this.status = 409;

    if (details) this.details = details;
    if (found) this.found = found;

    Error.captureStackTrace(this, this.constructor);
  }
}
