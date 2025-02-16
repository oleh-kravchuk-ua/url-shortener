import { Cascade, Entity, ManyToOne, Property, types } from "@mikro-orm/mongodb";

import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

export interface IncomeDatasetUrl {
  originalUrl: string;
  shortUrl: string;
  domain: string;
  slug: string;
  slugSize: number;
  owner?: UserEntity;
}

@Entity({ collection: "urls" })
export class UrlEntity extends BaseEntity {
  @Property({ type: types.string, unique: true })
  originalUrl!: string;

  @Property({ type: types.string })
  shortUrl!: string;

  @Property({ type: types.string })
  domain!: string;

  @Property({ type: types.datetime, unique: true })
  slug!: string;

  @Property({ type: types.integer })
  slugSize!: number;

  @Property({ type: types.integer, default: 0 })
  visits = 0;

  @ManyToOne(() => UserEntity, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true })
  owner?: UserEntity;

  constructor({ originalUrl, shortUrl, domain, slug, slugSize, owner }: IncomeDatasetUrl) {
    super();
    this.originalUrl = originalUrl;

    this.domain = domain;
    this.shortUrl = shortUrl;
    this.slug = slug;
    this.slugSize = slugSize;

    if (owner) this.owner = owner;
  }
}
