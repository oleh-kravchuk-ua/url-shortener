import type { CustomError } from "$infra/errors";

import { ErrorTitles } from "../../error-titles";

export interface IUrlResponseError {
  status: number;
  title: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  errors: any[];
}

export const mapErrorToResponse = (error: CustomError, message?: string): IUrlResponseError => {
  const status = error.status || 500;
  const reason = error?.name || "Internal server error";
  const details = error?.details; // In case of ConflictException

  const _message = `${message}${details ? ` ${details}` : ""}`;

  return {
    status,
    title: ErrorTitles.EXECUTION_ERROR,
    errors: [{ reason: `${reason}. ${_message}` }],
  };
};
