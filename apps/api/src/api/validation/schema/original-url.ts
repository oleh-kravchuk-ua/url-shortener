import { body } from "express-validator";

const MSG_PREFIX = "URL is invalid.";

export const validationOriginalUrl = () =>
  body("originalUrl")
    .customSanitizer((value) => {
      try {
        return decodeURIComponent(value); // Attempt to decode the URL if it's encoded
      } catch (_error) {
        return value; // If decoding fails, return original value
      }
    })
    .notEmpty()
    .withMessage(`${MSG_PREFIX} The value is mandatory (non-empty)`)
    .isLength({ max: 2048 })
    .withMessage(`${MSG_PREFIX} The value is too long. Max 2048 characters`)
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
      require_valid_protocol: true,
      disallow_auth: true,
    })
    .withMessage(`${MSG_PREFIX} Please provide a valid URL`)
    .custom((value) => {
      let url: URL;

      try {
        url = new URL(value);
      } catch (error) {
        throw new Error(`${MSG_PREFIX} Reason: ${(error as Error).message}`);
      }

      const hostname = url.hostname;
      // Prevent localhost and private IP addresses
      if (
        hostname === "localhost" ||
        hostname.startsWith("127.") ||
        hostname.startsWith("192.168.") ||
        hostname.startsWith("10.")
      ) {
        throw new Error(`${MSG_PREFIX} Please provide URL other than localhost or private IP addresses`);
      }
      return true;
    })
    .toLowerCase();
