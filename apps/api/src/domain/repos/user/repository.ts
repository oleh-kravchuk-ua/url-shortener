import type { EntityManager } from "@mikro-orm/core";
import { injectable } from "inversify";

import { UserEntity } from "$entity/user.entity";
import type { IUserRepository } from "./interface";

@injectable()
export class UserRepository implements IUserRepository {
  public async findById(em: EntityManager, id: string): Promise<UserEntity | null> {
    return em.findOne(UserEntity, { id });
  }

  public async findByEmail(em: EntityManager, email: string): Promise<UserEntity | null> {
    return em.findOne(UserEntity, { email });
  }

  public async save(em: EntityManager, user: UserEntity): Promise<void> {
    return em.persistAndFlush(user);
  }
}
