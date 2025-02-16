import type { EntityManager } from "@mikro-orm/core";

import { inject, injectable } from "inversify";

import { AbstractUsecase } from "../abstract.usecase";

import type { IRedirectBySlugUsecase, InputData, OutputData } from "./interface";
import { RedirectBySlugValidationKey, TOKEN_LOGGER_FOR_USECASE_REDIRECT_BY_SLUG } from "./interface";

import { TOKEN_SERVICE_URL } from "$service/url";
import type { IUrlService } from "$service/url";

import { checkUrlValidity, isUrl } from "$helper/url";
import type { ILogLayer } from "$logger";

@injectable()
export class RedirectBySlugUsecase extends AbstractUsecase implements IRedirectBySlugUsecase {
  @inject(TOKEN_SERVICE_URL)
  public readonly urlService: IUrlService;

  @inject(TOKEN_LOGGER_FOR_USECASE_REDIRECT_BY_SLUG)
  private readonly logger: ILogLayer;

  constructor(urlService: IUrlService, logger: ILogLayer) {
    super();
    this.urlService = urlService;
    this.logger = logger;
  }

  public async execute(em: EntityManager, dataset: InputData): Promise<OutputData> {
    const slug = dataset.slug;
    if (!slug) {
      this.logger.withContext({ slug }).info("Value `slug` should be valid");
      return { validationKey: RedirectBySlugValidationKey.MALFORMED_INPUT_DATA };
    }

    const entity = await this.urlService.findBySlug(em, slug);
    if (!entity) {
      this.logger.withContext({ slug }).info("Not found url by slug");
      return { validationKey: RedirectBySlugValidationKey.NOT_FOUND };
    }

    const originalUrl = entity.originalUrl;

    if (!isUrl(originalUrl)) {
      this.logger.withContext({ originalUrl }).info("Value `originalUrl` should be a valid URL");
      return { validationKey: RedirectBySlugValidationKey.NOT_VALID_URL };
    }

    if (!(await checkUrlValidity(originalUrl))) {
      this.logger.withContext({ originalUrl }).info("Value `originalUrl` has a broken link");
      return { validationKey: RedirectBySlugValidationKey.BROKEN_LINK };
    }

    await this.urlService.trackVisits(em, entity);

    return { result: entity };
  }
}
