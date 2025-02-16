import { satisfies } from "semver";
import configs from "../../package.json";

import { logger } from "$infra/logger";

const currentVersion = process.version;
const { node: requiredVersion } = configs.engines || {};

const details = {
  "Installed node version": currentVersion,
  "Required node version": requiredVersion,
};

if (requiredVersion && satisfies(currentVersion, requiredVersion)) {
  logger.info("*** Node version is satisfied ***");
  console.table(details);
} else {
  logger.withMetadata(details).error("!!! Attention! Incorrect node version !!!");
  console.table(details);
  process.exit(1);
}
