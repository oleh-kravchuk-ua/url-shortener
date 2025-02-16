import { APP_API_HOST } from "../../config/server";

export const ENDPOINTS = Object.freeze({
  SHORTEN_URL: `${APP_API_HOST}/urls/shorten`,
  REDIRECT_SLUG: `${APP_API_HOST}/urls/:slug`,
});
