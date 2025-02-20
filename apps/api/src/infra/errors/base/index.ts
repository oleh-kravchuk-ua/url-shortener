export enum ExceptionNames {
  InternalServer = "InternalServerException",
  Conflict = "ConflictException",
  BadRequest = "BadRequestException",
  Timeout = "TimeoutException",
  ExternalService = "ExternalServiceException",
}

export interface CustomError extends Error {
  status: number;
  name: typeof Error.name | ExceptionNames;
  details?: string;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  found?: Object;
}
