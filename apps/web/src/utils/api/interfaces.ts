export interface IUrlResponse {
  data: {
    status: number;
    type: string;
    id: string;
    attributes: IUrlResponseData;
  };
}

export interface IUrlResponseData {
  originalUrl: string;
  shortUrl: string;
  slug: string;
}
