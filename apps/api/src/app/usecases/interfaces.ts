import type { EntityManager } from "@mikro-orm/core";

export interface BaseUsecaseInputData {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export interface BaseUsecaseOutputData {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  result?: any;
  validationKey?: string;
}

export interface IBaseUsecase<T extends BaseUsecaseInputData, U extends BaseUsecaseOutputData> {
  execute(em: EntityManager, input: T): Promise<U>;
}
