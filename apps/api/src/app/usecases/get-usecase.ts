import ioc from "$infra/ioc-container";

import type { AbstractUsecase } from "./abstract.usecase";

export const getUsecaseOperation = <T>(token: symbol) => {
  const usecaseRedirectBySlug = ioc.get<T>(token) as AbstractUsecase;
  return usecaseRedirectBySlug.execute.bind(usecaseRedirectBySlug);
};
