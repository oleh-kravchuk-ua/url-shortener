import { ContainerModule } from "inversify";
import type { interfaces } from "inversify";

import { createLogger } from "$logger";
import type { ILogLayer } from "$logger";

import type { IUrlService } from "./url";
import { TOKEN_LOGGER_FOR_SERVICE_URL, TOKEN_SERVICE_URL, UrlService } from "./url";

import type { IUserService } from "./user";
import { TOKEN_LOGGER_FOR_SERVICE_USER, TOKEN_SERVICE_USER, UserService } from "./user";

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUrlService>(TOKEN_SERVICE_URL).to(UrlService).inSingletonScope();

  bind<ILogLayer>(TOKEN_LOGGER_FOR_SERVICE_URL)
    .toDynamicValue(() => createLogger({ prefix: "[Logger_UrlService]" }))
    .inTransientScope();

  bind<IUserService>(TOKEN_SERVICE_USER).to(UserService).inSingletonScope();

  bind<ILogLayer>(TOKEN_LOGGER_FOR_SERVICE_USER)
    .toDynamicValue(() => createLogger({ prefix: "[Logger_UserService]" }))
    .inTransientScope();
});
