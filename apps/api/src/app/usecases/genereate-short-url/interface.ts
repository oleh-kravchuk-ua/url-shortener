import type { EntityManager } from "@mikro-orm/core";
import type { IBaseUsecase } from "../interfaces";

import type { UrlEntity } from "$entity/url.entity";
import type { IUrlService } from "$service/url";

export interface InputData {
  originalUrl: string;
}

export interface OutputData {
  result?: UrlEntity | null;
  validationKey?: GenerateShortUrlValidationKey;
}

export interface IGenerateShortUrlUsecase extends IBaseUsecase<InputData, OutputData> {
  urlService: IUrlService;

  execute(em: EntityManager, data: InputData): Promise<OutputData>;
}

export const TOKEN_USECASE_GENERATE_SHORT_URL = Symbol.for("IGenerateShortUrlUsecase");
export const TOKEN_LOGGER_FOR_USECASE_GENERATE_SHORT_URL = Symbol.for("Logger_for_IGenerateShortUrlUsecase");

export enum GenerateShortUrlValidationKey {
  MALFORMED_INPUT_DATA = "malformedInputData",
}
