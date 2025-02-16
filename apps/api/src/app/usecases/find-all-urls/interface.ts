import type { EntityManager } from "@mikro-orm/core";
import type { IBaseUsecase } from "../interfaces";

import type { UrlEntity } from "$entity/url.entity";
import type { IUrlService } from "$service/url";

export interface OutputData {
  result?: Partial<UrlEntity>[];
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export interface IFindAllUrlsUsecase extends IBaseUsecase<{}, OutputData> {
  urlService: IUrlService;

  execute(em: EntityManager): Promise<OutputData>;
}

export const TOKEN_USECASE_FIND_ALL_URLS = Symbol.for("IFindAllUrlsUsecase");
export const TOKEN_LOGGER_FOR_USECASE_FIND_ALL_URLS = Symbol.for("Logger_for_IFindAllUrlsUsecase");
