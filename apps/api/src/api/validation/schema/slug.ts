import { SLUG_SIZE } from "$infra/slug";
import { param } from "express-validator";

const MSG_PREFIX = "Parameter 'slug' is invalid.";

export const validationSlug = () =>
  param("slug")
    .notEmpty()
    .isString()
    .isLength({ min: SLUG_SIZE.MIN, max: SLUG_SIZE.MAX })
    //isSlug()
    .custom((value) => !["slug", "shorten", "urls"].includes(value))
    .customSanitizer((value) => {
      try {
        return decodeURIComponent(value); // Attempt to decode the URL if it's encoded
      } catch {
        return value; // If decoding fails, return original value
      }
    })
    .escape()
    .withMessage(MSG_PREFIX);
