import type { Options } from "express-rate-limit";

export const options: Partial<Options> = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: "Too many requests, please try again later",
  standardHeaders: true,
  keyGenerator: (req) => {
    return (req.headers["x-forwarded-for"] as string) || req.ip || "unknown";
  },
};
