import type { UserEntity } from "$entity/user.entity";
import type { EntityManager } from "@mikro-orm/core";

export interface IUserRepository {
  findById(em: EntityManager, id: string): Promise<UserEntity | null>;
  findByEmail(em: EntityManager, email: string): Promise<UserEntity | null>;
  save(em: EntityManager, user: UserEntity): Promise<void>;
}

export const TOKEN_REPO_USER = Symbol.for("IUserRepository");
