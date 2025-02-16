import { WEB_PUBLIC_HOST } from "$config/client";
import { UrlEntity } from "$entity/url.entity";
import { SLUG_SIZE, generateSlug } from "$infra/slug";

export { SLUG_SIZE };

export const generateNewEntityWithSlug = (originalUrl: string, slugSize = SLUG_SIZE.DEFAULT): UrlEntity => {
  const slug = generateSlug(slugSize);

  const domain = WEB_PUBLIC_HOST;
  const shortUrl = `${domain}/${slug}`;

  return new UrlEntity({
    originalUrl,
    shortUrl,
    domain,
    slug,
    slugSize,
  });
};
