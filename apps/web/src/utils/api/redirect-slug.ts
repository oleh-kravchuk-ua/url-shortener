import { apiCall } from "./call";
import { ENDPOINTS } from "./endpoints";
import type { IUrlResponse } from "./interfaces";

export const redirectSlug = async (slug?: string): Promise<IUrlResponse> => {
  if (!slug || typeof slug !== "string") {
    throw new Error("Invalid slug");
  }

  const endpoint = ENDPOINTS.REDIRECT_SLUG.replace(":slug", slug);
  return apiCall(endpoint);
};
