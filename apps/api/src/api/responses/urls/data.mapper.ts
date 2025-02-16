// In json:api formnat

import type { UrlEntity } from "$entity/url.entity";

export interface IUrlResponseData {
  data: {
    status: number;
    type: string;
    id: string;
    attributes: IUrlData;
  };
}

export interface IUrlData {
  originalUrl: string;
  //domain: string;
  shortUrl: string;
  slug: string;
  //slugSize?: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date | undefined;
  };
}

enum ResponseTypes {
  URL = "urls",
}

export const mapDataToResponse = (status: number, entity: UrlEntity): IUrlResponseData => {
  return {
    data: {
      status,
      type: ResponseTypes.URL,
      id: entity.slug,
      attributes: mapUrlData(entity),
    },
  };
};

export const mapUrlData = (entity: UrlEntity): IUrlData => {
  return {
    originalUrl: entity.originalUrl,
    //domain: entity.domain,
    shortUrl: entity.shortUrl,
    slug: entity.slug,
    //...(entity.slugSize ? { slugSize: entity.slugSize } : null),
    timestamps: {
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    },
  };
};
