import ioc from "./ioc-container";

import { reposModule } from "$repo/ioc.module";
import { servicesModule } from "$service/ioc.module";
import { usecasesModule } from "$usecase/ioc.module";

ioc.load(reposModule, servicesModule, usecasesModule);

export { ioc };
