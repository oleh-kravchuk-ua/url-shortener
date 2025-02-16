import { ConsoleTransport } from "loglayer";
import type { LogLayerConfig, LogLevel } from "loglayer";

const DEFAULT_LEVEL = "info";

interface ProcessEnv {
  API_LOG_LEVEL?: string;
  API_LOG_ENABLED?: string;
}

const env = process.env as ProcessEnv;

export const LOG_LEVEL = env.API_LOG_LEVEL || DEFAULT_LEVEL;
export const IS_LOG_ENABLED = env.API_LOG_ENABLED === "on";

export const defaultOptions: LogLayerConfig = {
  transport: new ConsoleTransport({
    logger: console,
    level: LOG_LEVEL as LogLevel,
  }),
  prefix: "[api]",
  enabled: IS_LOG_ENABLED,
};
