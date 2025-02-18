import { ContainerModule } from "inversify";
import type { interfaces } from "inversify";

import { createLogger } from "$logger";
import type { ILogLayer } from "$logger";

import type { IGenerateShortUrlUsecase } from "./genereate-short-url";
import {
  GenerateShortUrlUsecase,
  TOKEN_LOGGER_FOR_USECASE_GENERATE_SHORT_URL,
  TOKEN_USECASE_GENERATE_SHORT_URL,
} from "./genereate-short-url";

import type { IRedirectBySlugUsecase } from "./redirect-by-slug";
import {
  RedirectBySlugUsecase,
  TOKEN_LOGGER_FOR_USECASE_REDIRECT_BY_SLUG,
  TOKEN_USECASE_REDIRECT_BY_SLUG,
} from "./redirect-by-slug";

import type { IFindAllUrlsUsecase } from "./find-all-urls";
import {
  FindAllUrlsUsecase,
  TOKEN_LOGGER_FOR_USECASE_FIND_ALL_URLS,
  TOKEN_USECASE_FIND_ALL_URLS,
} from "./find-all-urls";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IGenerateShortUrlUsecase>(TOKEN_USECASE_GENERATE_SHORT_URL).to(GenerateShortUrlUsecase);
  bind<ILogLayer>(TOKEN_LOGGER_FOR_USECASE_GENERATE_SHORT_URL).toDynamicValue(() =>
    createLogger({ prefix: "[Logger_GenerateShortUrlUsecase]" }),
  );

  bind<IRedirectBySlugUsecase>(TOKEN_USECASE_REDIRECT_BY_SLUG).to(RedirectBySlugUsecase);
  bind<ILogLayer>(TOKEN_LOGGER_FOR_USECASE_REDIRECT_BY_SLUG).toDynamicValue(() =>
    createLogger({ prefix: "[Logger_RedirectBySlugUsecase]" }),
  );

  bind<IFindAllUrlsUsecase>(TOKEN_USECASE_FIND_ALL_URLS).to(FindAllUrlsUsecase);
  bind<ILogLayer>(TOKEN_LOGGER_FOR_USECASE_FIND_ALL_URLS).toDynamicValue(() =>
    createLogger({ prefix: "[Logger_FindAllUrlsUsecase]" }),
  );
});
