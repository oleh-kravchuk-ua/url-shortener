import rateLimit from "express-rate-limit";
import { options } from "./config";

export const rateLimiter = rateLimit(options);
