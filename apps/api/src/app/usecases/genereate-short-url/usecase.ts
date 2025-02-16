import type { EntityManager } from "@mikro-orm/core";

import { inject, injectable } from "inversify";

import { AbstractUsecase } from "../abstract.usecase";

import { GenerateShortUrlValidationKey, TOKEN_LOGGER_FOR_USECASE_GENERATE_SHORT_URL } from "./interface";
import type { IGenerateShortUrlUsecase, InputData, OutputData } from "./interface";

import { TOKEN_SERVICE_URL } from "$service/url";
import type { IUrlService } from "$service/url";

import type { ILogLayer } from "$logger";

import { isUrl } from "$helper/url";

@injectable()
export class GenerateShortUrlUsecase extends AbstractUsecase implements IGenerateShortUrlUsecase {
  @inject(TOKEN_SERVICE_URL)
  public readonly urlService: IUrlService;

  @inject(TOKEN_LOGGER_FOR_USECASE_GENERATE_SHORT_URL)
  private readonly logger: ILogLayer;

  constructor(urlService: IUrlService, logger: ILogLayer) {
    super();
    this.urlService = urlService;
    this.logger = logger;
  }

  public async execute(em: EntityManager, dataset: InputData): Promise<OutputData> {
    const originalUrl = dataset.originalUrl;
    if (!isUrl(originalUrl)) {
      this.logger.withContext({ originalUrl }).info("Value `originalUrl` should be a valid URL");
      return { validationKey: GenerateShortUrlValidationKey.MALFORMED_INPUT_DATA };
    }

    let entity = await this.urlService.findByOriginalUrl(em, originalUrl);
    if (entity) {
      this.logger.withContext({ originalUrl }).info("URL is already persisted");

      return { result: entity };
    }

    entity = await this.urlService.generateUnique(em, originalUrl);

    return { result: entity };
  }
}
