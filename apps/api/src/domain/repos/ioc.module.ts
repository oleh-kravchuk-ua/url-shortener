import { ContainerModule } from "inversify";
import type { interfaces } from "inversify";

import type { IUrlRepository } from "./url";
import { TOKEN_REPO_URL, UrlRepository } from "./url";

import type { IUserRepository } from "./user";
import { TOKEN_REPO_USER, UserRepository } from "./user";

export const reposModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUrlRepository>(TOKEN_REPO_URL).to(UrlRepository).inSingletonScope();
  bind<IUserRepository>(TOKEN_REPO_USER).to(UserRepository).inSingletonScope();
});
