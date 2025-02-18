import { makeLoggerMiddleware, textSerializer } from "inversify-logger-middleware";
import type interfaces from "inversify-logger-middleware/dts/interfaces/interfaces";

import { options } from "./config";

import { isProduction } from "$config/enviroment";
import { logger as mainLogger } from "$logger";

interface ProcessEnv {
  API_IOC_DEBUG?: string;
}

interface LoggerOutput<T> {
  entry: T;
}

const env = process.env as ProcessEnv;

export const isIocDebug = env.API_IOC_DEBUG === "on";
export const isDebugActivated = !isProduction && isIocDebug;

const makeStringRenderer = (loggerOutput: LoggerOutput<string>) => (entry: interfaces.LogEntry) => {
  loggerOutput.entry = textSerializer(entry);
  if (isDebugActivated) mainLogger.info(loggerOutput.entry);
};

const loggerOutput: LoggerOutput<string> = { entry: "" };
const render = makeStringRenderer(loggerOutput);

export default makeLoggerMiddleware(options, render);
