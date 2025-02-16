import { Entity, PrimaryKey, Property, SerializedPrimaryKey, types } from "@mikro-orm/mongodb";
import type { ObjectId } from "@mikro-orm/mongodb";

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property({ onCreate: () => new Date(), type: types.datetime })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), type: types.datetime })
  updatedAt?: Date;

  @Property({ default: false, type: types.boolean })
  deleted = false;

  @Property({ version: true })
  version = 1;
}
