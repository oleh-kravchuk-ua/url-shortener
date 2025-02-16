import type { ServerOptions } from "node:http";

export const KEEP_ALIVE_TIMEOUT = 60000;

export const options: ServerOptions = {
  keepAlive: true,
  keepAliveTimeout: KEEP_ALIVE_TIMEOUT,
};
