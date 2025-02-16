import { generateShortHex } from "$helper/random-hex";

export enum SLUG_SIZE {
  DEFAULT = 4,
  MIN = 4,
  MAX = 36,
}

export const generateSlug = (slugSize = SLUG_SIZE.DEFAULT): string => {
  return generateShortHex(slugSize);
};
