import { LogLayer } from "loglayer";
import type { ILogLayer, LogLayerConfig } from "loglayer";
import { defaultOptions } from "./config";

export const createLogger = (options?: Partial<LogLayerConfig>) => {
  const _options = { ...defaultOptions, ...options };
  return new LogLayer(_options);
};

export type { ILogLayer };

// Common logger which is used in non-functional operations, for instance: during setup
export const logger = createLogger({ prefix: "[infra]" });
