import { randomBytes } from "node:crypto";

export const generateShortHex = (size = 4) => {
  return randomBytes(size).toString("hex");
};
