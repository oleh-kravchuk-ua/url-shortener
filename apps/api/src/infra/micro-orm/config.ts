//import { Migrator /*, TSMigrationGenerator*/ } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/mongodb";
import type { /*MigrationsOptions, */ Options as MongoOptions } from "@mikro-orm/mongodb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

//import { BaseEntity, UrlEntity, UserEntity } from "$domain/entities";

import { isProduction } from "$config/enviroment";

import { logger } from "$logger";

interface ProcessEnv {
  API_MONGODB_DATABASE?: string;
  API_MONGODB_HOSTNAME?: string;
  API_MONGODB_PORT?: string;
  API_MONGODB_REPLICA_SET?: string;
  API_MONGODB_WITH_MIGRATION?: string;
}
const env = process.env as ProcessEnv;

export const MONGODB_WITH_MIGRATION = env.API_MONGODB_WITH_MIGRATION === "on";
export const MONGODB_DATABASE = env.API_MONGODB_DATABASE || "url-shortener";
export const MONGODB_HOSTNAME = env.API_MONGODB_HOSTNAME || "url-shortener-db";
export const MONGODB_PORT = env.API_MONGODB_PORT || "27017";
export const MONGODB_REPLICA_SET = env.API_MONGODB_REPLICA_SET || "rs0";

export const MONGODB_URL = `mongodb://${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGODB_DATABASE}?replicaSet=${MONGODB_REPLICA_SET}`;

const pool = { min: 2, max: 10 };

// const migrations: MigrationsOptions = {
//   tableName: "mikro_orm_migrations",
//   path: "dist/migrations",
//   pathTs: "src/migrations",
//   glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
//   transactional: true, // run each migration inside transaction
//   //disableForeignKeys: true, // try to disable foreign_key_checks (or equivalent)
//   allOrNothing: true, // wrap all migrations in master transaction
//   dropTables: true, // allow to disable table dropping
//   safe: false, // allow to disable table and column dropping
//   snapshot: true, // save snapshot when creating new migrations
//   emit: "ts", // migration generation mode
//   generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
// };

const options: MongoOptions = {
  ...(isProduction ? null : { debug: true }),
  name: "mongo",
  //entities: [BaseEntity, UrlEntity, UserEntity],
  entities: ["dist/domain/entities/*.entity.js"],
  entitiesTs: ["src/domain/entities/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  clientUrl: MONGODB_URL,
  pool,
  logger: (message: string) => logger.info(message),
  //extensions: [Migrator],
  //migrations,
  verbose: true,
  //metadataCache: { enabled: false, pretty: true },
};

export default defineConfig(options);
