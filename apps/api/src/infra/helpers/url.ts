import { getContentByUrl } from "$infra/http/undici";

export const toUrl = (url: string): URL | undefined => {
  try {
    return new URL(url);
  } catch (_e) {
    return undefined;
  }
};

export const isUrl = (url: string): boolean => {
  return !!toUrl(url);
};

export const checkUrlValidity = async (url: string): Promise<boolean> => {
  try {
    const response = await getContentByUrl(url);
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    return false;
  }
};
