import { LockMode, OptimisticLockError, UniqueConstraintViolationException } from "@mikro-orm/core";
import type { EntityManager, FilterObject } from "@mikro-orm/core";

import { inject, injectable } from "inversify";

import { UrlEntity } from "$entity/url.entity";
import type { IncomeDatasetUrl } from "$entity/url.entity";

import { TOKEN_REPO_URL } from "$repo/url";
import type { IUrlRepository } from "$repo/url";

import { TOKEN_LOGGER_FOR_SERVICE_URL } from "./interface";
import type { IUrlService } from "./interface";

import { repeatUntilAsync } from "$helper/repeat-until-async";

import { SLUG_SIZE, generateNewEntityWithSlug } from "./utils";

import type { ILogLayer } from "$logger";

@injectable()
export class UrlService implements IUrlService {
  @inject(TOKEN_REPO_URL)
  private readonly urlRepository: IUrlRepository;

  @inject(TOKEN_LOGGER_FOR_SERVICE_URL)
  private readonly logger: ILogLayer;

  constructor(urlRepository: IUrlRepository, logger: ILogLayer) {
    this.urlRepository = urlRepository;
    this.logger = logger;
  }

  public async findAllActive(em: EntityManager, options?: FilterObject<UrlEntity>): Promise<Partial<UrlEntity>[]> {
    return em.findAll(UrlEntity, {
      where: { ...options, deleted: false },
      fields: ["id", "originalUrl", "shortUrl", "slug"],
    });
  }

  public async findByOriginalUrl(em: EntityManager, originalUrl: string): Promise<UrlEntity | null> {
    return em.findOne(UrlEntity, { originalUrl });
  }

  public async findBySlug(em: EntityManager, slug: string): Promise<UrlEntity | null> {
    return em.findOne(UrlEntity, { slug });
  }

  public async create(em: EntityManager, dataset: IncomeDatasetUrl): Promise<UrlEntity> {
    const entity = new UrlEntity(dataset);
    await this.urlRepository.save(em, entity);
    return entity;
  }

  /**
   * Description placeholder
   *
   * @public
   * @async
   * @param {EntityManager} em
   * @param {string} originalUrl
   * @returns {Promise<UrlEntity>}
   */
  public async generateUnique(em: EntityManager, originalUrl: string): Promise<UrlEntity> {
    let entity: UrlEntity | undefined;

    let iteration = 0;
    const maxIterations = 3; // We need to avoid a potential Infinite loop

    let isSuccess = false;

    /**
     * We have to generate with repeat when we have UniqueConstraintViolationException in case of slug duplication
     * @see: UniqueConstraintViolationException
     */
    await repeatUntilAsync(
      () => !!isSuccess || iteration >= maxIterations,
      async () => {
        entity = await this.generateNewAndSave(em, originalUrl);
        if (entity) isSuccess = true;
      },
      (error: Error) => {
        if (error instanceof UniqueConstraintViolationException) {
          this.logger
            .withError(error)
            .withMetadata({
              originalUrl,
              slug: entity?.slug,
            })
            .error("UniqueConstraintViolationException. Url slug already exist");

          iteration++;
          // Go to the next iteration
        } else {
          // No need to go to the next iteration, we have some unexpected error case, we stop Slug generation
          this.logger
            .withMetadata({
              originalUrl,
              slug: entity?.slug,
            })
            .error("Failed saving of a newly created url slug");
          throw error;
        }
      },
    );

    if (!isSuccess) {
      const message = "Failed to generate a new slug (url entity). No success";
      this.logger.withMetadata({ originalUrl, slug: entity?.slug, isSuccess }).error(message);
      throw new Error(message);
    }

    if (!entity) {
      const message = "Failed to generate a new slug (url entity). Entity is missed";
      this.logger.withMetadata({ originalUrl }).error(message);
      throw new Error(message);
    }

    return entity;
  }

  public async generateNewAndSave(em: EntityManager, originalUrl: string): Promise<UrlEntity> {
    let found: UrlEntity | null = null;

    let iteration = 0;
    const maxIterations = 3; // We need to avoid a potential Infinite loop

    const processed = new Set<string>();
    let generatedEntity: UrlEntity | undefined;

    let metadata = {};

    let isSuccess = false;

    await repeatUntilAsync(
      () => isSuccess || iteration >= maxIterations,
      async () => {
        found = null; // Reset a previously found

        const slugSize = SLUG_SIZE.DEFAULT;

        generatedEntity = generateNewEntityWithSlug(originalUrl, slugSize);

        metadata = { isSuccess, originalUrl, slugSize, slug: generatedEntity.slug };

        this.logger.withMetadata(metadata).info("Generated a new slug");
        if (processed.has(generatedEntity.slug)) {
          this.logger.withMetadata(metadata).info("A generated slug was already processed before");
        } else {
          found = await this.findBySlug(em, generatedEntity.slug);
          if (found) {
            this.logger.withMetadata(metadata).info("Found record by slug");
          } else {
            isSuccess = true;
          }
        }

        processed.add(generatedEntity.slug);
        iteration++;
      },
    );

    if (!generatedEntity?.slug) {
      this.logger.withMetadata(metadata).error("Failed to generate a new slug");
      throw new Error(`Failed to generate a new slug for originalUrl: '${originalUrl}'`);
    }

    if (found) {
      this.logger.withMetadata(metadata).error("Conflict error. The slug already exists");
      throw new Error(`Conflict error. Invalid generated slug for originalUrl: '${originalUrl}'`);
    }

    if (!isSuccess) {
      this.logger.withMetadata(metadata).error("The slug is not generated");
      throw new Error(`Conflict error. Invalid generated slug for originalUrl: '${originalUrl}'`);
    }

    await this.urlRepository.save(em, generatedEntity);

    return generatedEntity;
  }

  public async incementVisits(em: EntityManager, entity: UrlEntity): Promise<void> {
    await em.lock(entity, LockMode.OPTIMISTIC, entity.version);
    entity.visits = (entity.visits || 0) + 1;
    return this.urlRepository.save(em, entity);
  }

  public async trackVisits(em: EntityManager, entity: UrlEntity): Promise<void> {
    let iteration = 0;
    const maxIterations = 3; // We need to avoid a potential Infinite loop

    let isSuccess = false;

    /**
     * We have to generate with repeat when we have OptimisticLockError in case of slug duplication
     * @see: OptimisticLockError
     */
    await repeatUntilAsync(
      () => !!isSuccess || iteration >= maxIterations,
      async () => {
        await this.incementVisits(em, entity);
        isSuccess = true;
      },
      (error: Error) => {
        if (error instanceof OptimisticLockError) {
          this.logger
            .withError(error)
            .withMetadata({
              id: entity.id,
              slug: entity?.slug,
            })
            .error("OptimisticLockError. URL record was changed simultaneously by someone else");

          iteration++;
          // Go to the next iteration
        } else {
          // No need to go to the next iteration, we have some unexpected error case, we stop Slug generation
          this.logger
            .withMetadata({
              id: entity.id,
              slug: entity?.slug,
            })
            .error("Failed to increment visits");
          throw error;
        }
      },
    );

    if (!isSuccess) {
      const message = "Failed to track the visits (url entity). No success";
      this.logger.withMetadata({ id: entity.id, slug: entity?.slug, isSuccess }).error(message);
      throw new Error(message);
    }
  }
}
