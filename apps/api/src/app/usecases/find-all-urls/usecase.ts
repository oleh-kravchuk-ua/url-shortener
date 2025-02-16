import type { EntityManager } from "@mikro-orm/core";

import { inject, injectable } from "inversify";

import { AbstractUsecase } from "../abstract.usecase";

import { TOKEN_LOGGER_FOR_USECASE_FIND_ALL_URLS } from "./interface";
import type { IFindAllUrlsUsecase, OutputData } from "./interface";

import { TOKEN_SERVICE_URL } from "$service/url";
import type { IUrlService } from "$service/url";

import type { ILogLayer } from "$logger";

@injectable()
export class FindAllUrlsUsecase extends AbstractUsecase implements IFindAllUrlsUsecase {
  @inject(TOKEN_SERVICE_URL)
  public readonly urlService: IUrlService;

  @inject(TOKEN_LOGGER_FOR_USECASE_FIND_ALL_URLS)
  private readonly logger: ILogLayer;

  constructor(urlService: IUrlService, logger: ILogLayer) {
    super();
    this.urlService = urlService;
    this.logger = logger;
  }

  public async execute(em: EntityManager): Promise<OutputData> {
    const entities = await this.urlService.findAllActive(em);
    this.logger.info(`Found ${entities.length} created URLs`);
    return { result: entities };
  }
}
