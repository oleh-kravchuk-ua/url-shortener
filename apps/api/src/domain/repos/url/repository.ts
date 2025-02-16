import type { EntityManager } from "@mikro-orm/core";
import { injectable } from "inversify";

import { UrlEntity } from "$entity/url.entity";
import type { IUrlRepository } from "./interface";

@injectable()
export class UrlRepository implements IUrlRepository {
  public async findAll(em: EntityManager): Promise<UrlEntity[]> {
    return em.find(UrlEntity, {});
  }

  public async findById(em: EntityManager, id: string): Promise<UrlEntity | null> {
    return em.findOne(UrlEntity, { id });
  }

  public async save(em: EntityManager, url: UrlEntity): Promise<void> {
    return em.persistAndFlush(url);
  }

  public async delete(em: EntityManager, url: UrlEntity): Promise<void> {
    return em.remove(url).flush();
  }
}
