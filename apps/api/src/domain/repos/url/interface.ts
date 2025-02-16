import type { UrlEntity } from "$entity/url.entity";
import type { EntityManager } from "@mikro-orm/core";

export interface IUrlRepository {
  findAll(em: EntityManager): Promise<UrlEntity[]>;
  findById(em: EntityManager, id: string): Promise<UrlEntity | null>;
  save(em: EntityManager, url: UrlEntity): Promise<void>;
  delete(em: EntityManager, url: UrlEntity): Promise<void>;
}

export const TOKEN_REPO_URL = Symbol.for("IUrlRepository");
