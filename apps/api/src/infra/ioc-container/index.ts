import { BindingScopeEnum, Container } from "inversify";
import type { interfaces } from "inversify";

import { isProduction } from "$config/enviroment";
import bindingLogger from "./logger";

const options = {
  autoBindInjectable: true, // Mandatory for PROD env
  defaultScope: BindingScopeEnum.Transient,
  skipBaseClassChecks: true,
};

// @todo: Inversify all application
// A good example here: https://github.com/PodaruDragos/inversify-example-app

const ioc: interfaces.Container = new Container(options);

if (!isProduction) {
  ioc.applyMiddleware(bindingLogger);
}

export default ioc;
