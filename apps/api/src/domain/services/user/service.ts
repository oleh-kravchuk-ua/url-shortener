import type { EntityManager } from "@mikro-orm/core";
import { inject, injectable } from "inversify";

import { UserEntity } from "$entity/user.entity";
import type { IncomeDatasetUser } from "$entity/user.entity";

import { TOKEN_REPO_USER } from "$repo/user";
import type { IUserRepository } from "$repo/user";

import { TOKEN_LOGGER_FOR_SERVICE_USER } from "./interface";
import type { IUserService } from "./interface";

import type { ILogLayer } from "$logger";

@injectable()
export class UserService implements IUserService {
  @inject(TOKEN_REPO_USER)
  private readonly userRepository: IUserRepository;

  @inject(TOKEN_LOGGER_FOR_SERVICE_USER)
  private readonly logger: ILogLayer;

  constructor(userRepository: IUserRepository, logger: ILogLayer) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  public async create(em: EntityManager, dataset: IncomeDatasetUser): Promise<UserEntity> {
    const url = new UserEntity(dataset);
    await this.userRepository.save(em, url);
    this.logger.info("Usser data saved");
    return url;
  }
}
