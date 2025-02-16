import type { IncomingMessage, ServerResponse } from "node:http";
import type { Options } from "morgan";

import { isProduction } from "$config/enviroment";

export const format = isProduction ? "combined" : "dev";

export const options: Options<IncomingMessage, ServerResponse> = {
  skip: (_req, res) => res.statusCode < 400,
  stream: {
    write: (message) => console.error(message.trim()),
  },
};
