import { Cascade, Collection, Entity, Index, OneToMany, Property, Unique, types } from "@mikro-orm/mongodb";

import { BaseEntity } from "./base.entity";
import { UrlEntity } from "./url.entity";

export interface IncomeDatasetUser {
  name: string;
  email: string;
  password: string;
}

@Entity({ collection: "users" })
@Unique({ properties: ["name", "email"] })
export class UserEntity extends BaseEntity {
  @Property({ type: types.string })
  @Index()
  name!: string;

  @Property({ type: types.string })
  @Index()
  email!: string;

  @Property({ type: types.string })
  password!: string;

  @OneToMany(
    () => UrlEntity,
    (b) => b.owner,
    { cascade: [Cascade.ALL] },
  )
  urls = new Collection<UrlEntity>(this);

  constructor({ name, email, password }: IncomeDatasetUser) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
