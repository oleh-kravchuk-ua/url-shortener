import type { CorsOptions } from "cors";

import { origin } from "./check-origin";

export const corsOptions: CorsOptions = {
  origin,
  methods: ["GET", "POST" /*, "PUT", "PATCH", "DELETE"*/],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  maxAge: 86400, // 24 hours
};
