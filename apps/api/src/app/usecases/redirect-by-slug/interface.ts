import type { EntityManager } from "@mikro-orm/core";
import type { IBaseUsecase } from "../interfaces";

import type { UrlEntity } from "$entity/url.entity";
import type { IUrlService } from "$service/url";

export interface InputData {
  slug: string;
}

export interface OutputData {
  result?: UrlEntity | null;
  validationKey?: RedirectBySlugValidationKey;
}

export interface IRedirectBySlugUsecase extends IBaseUsecase<InputData, OutputData> {
  urlService: IUrlService;

  execute(em: EntityManager, data: InputData): Promise<OutputData>;
}

export const TOKEN_USECASE_REDIRECT_BY_SLUG = Symbol.for("IRedirectBySlugUsecase");
export const TOKEN_LOGGER_FOR_USECASE_REDIRECT_BY_SLUG = Symbol.for("Logger_for_IRedirectBySlugUsecase");

export enum RedirectBySlugValidationKey {
  MALFORMED_INPUT_DATA = "malformedInputData",
  NOT_FOUND = "notFound",
  NOT_VALID_URL = "notValidUrl",
  BROKEN_LINK = "brokenLink",
}
