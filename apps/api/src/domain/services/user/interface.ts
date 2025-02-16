import type { IncomeDatasetUser, UserEntity } from "$entity/user.entity";
import type { EntityManager } from "@mikro-orm/core";

export interface IUserService {
  create(em: EntityManager, dataset: IncomeDatasetUser): Promise<UserEntity>;
}

export const TOKEN_SERVICE_USER = Symbol.for("IUserService");

export const TOKEN_LOGGER_FOR_SERVICE_USER = Symbol.for("Logger_for_UserService");
