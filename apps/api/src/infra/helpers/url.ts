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

// @deprecated Not used currently
export const isHttps = (url: string): boolean => {
  const _url = toUrl(url);
  return _url?.protocol === "https:";
};

export const checkUrlValidity = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    return false;
  }
};
