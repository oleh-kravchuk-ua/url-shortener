import type { IncomeDatasetUrl, UrlEntity } from "$entity/url.entity";
import type { EntityManager, FilterObject } from "@mikro-orm/core";

export interface IUrlService {
  findAllActive(em: EntityManager, options?: FilterObject<UrlEntity>): Promise<Partial<UrlEntity>[]>;

  findByOriginalUrl(em: EntityManager, originalUrl: string): Promise<UrlEntity | null>;
  findBySlug(em: EntityManager, slug: string): Promise<UrlEntity | null>;

  create(em: EntityManager, dataset: IncomeDatasetUrl): Promise<UrlEntity>;

  generateUnique(em: EntityManager, originalUrl: string): Promise<UrlEntity>;
  generateNewAndSave(em: EntityManager, originalUrl: string): Promise<UrlEntity>;

  incementVisits(em: EntityManager, url: UrlEntity): Promise<void>;
  trackVisits(em: EntityManager, entity: UrlEntity): Promise<void>;
}

export const TOKEN_SERVICE_URL = Symbol.for("IUrlService");
export const TOKEN_LOGGER_FOR_SERVICE_URL = Symbol.for("Logger_for_UrlService");
