import { MikroORM } from "@mikro-orm/mongodb"; // or any other driver package

import { isProduction } from "$config/enviroment";
import { logger } from "$logger";
import options, { MONGODB_WITH_MIGRATION as WITH_MIGRATION } from "./config";

export let orm: MikroORM;

/**
 * @param withRefresh Use it only in DEV and TEST envs, it will drop all collections and recreate them. Use it with caution!
 * @returns
 */
export const connectDB = async (withRefresh = false) => {
  if (orm) return orm;

  try {
    orm = await MikroORM.init(options);

    if (await orm.isConnected()) {
      logger.info("MongoDB connected");
    }

    /**
     * Create collections based on the entity schema
     *
     * `createSchema` in MikroORM is used to create collections and indices based on your defined entities.
     * It does not alter existing collections (i.e., it will not modify or migrate existing data).
     *
     * For managing schema changes over time, you should use migrations to reflect any updates made to the entity definitions
     * after the initial schema creation.
     */
    await orm.schema.createSchema();

    // Avoid refreshDatabase in production to prevent data loss
    if (withRefresh && !isProduction) {
      await orm.schema.refreshDatabase();
    }

    // Sync the schema with migrations
    if (WITH_MIGRATION && orm.migrator) {
      await orm.migrator.up(); // Run migrations after the schema is in place
    }

    return orm;
  } catch (error) {
    let message = "Unable to connect to MongoDB";
    if (!isProduction) {
      message += `: ${options.clientUrl}`;
    }
    logger.error(message);

    throw error;
  }
};
