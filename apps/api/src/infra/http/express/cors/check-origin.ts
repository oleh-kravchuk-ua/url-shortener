import { WEB_PUBLIC_HOST } from "$config/client";
import { isProduction } from "$config/enviroment";

const CORS_WHITELIST = [WEB_PUBLIC_HOST];

type TypeOrigin = string | undefined;
type TypeCallback = (error: Error | null, allow?: boolean) => void;

const fnCheckOrigin = (origin: TypeOrigin, callback: TypeCallback): void => {
  if (!origin || CORS_WHITELIST.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error(`Origin '${origin}' is not allowed by CORS`));
  }
};

export const origin = isProduction ? fnCheckOrigin : "*";
