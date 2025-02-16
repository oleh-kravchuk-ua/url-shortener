import { apiCall } from "./call";
import { ENDPOINTS } from "./endpoints";
import type { IUrlResponse } from "./interfaces";

export const shortenUrl = async (originalUrl: string): Promise<IUrlResponse> => {
  if (!originalUrl || typeof originalUrl !== "string") {
    throw new Error("Invalid original URL");
  }

  const options = {
    method: "POST",
    body: JSON.stringify({ originalUrl: encodeURIComponent(originalUrl) }),
  };

  return apiCall(ENDPOINTS.SHORTEN_URL, options);
};
