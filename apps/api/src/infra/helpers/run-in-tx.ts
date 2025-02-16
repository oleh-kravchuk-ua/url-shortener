import type { EntityManager } from "@mikro-orm/core";

import { orm } from "$infra/micro-orm";

export const runInTransaction = async <T, U>(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  operation: (em: EntityManager, dataset: T, ...rest: any[]) => Promise<U>,
  dataset: T,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ...rest: any[]
): Promise<U> => {
  const em = orm.em.fork();
  await em.begin();

  try {
    const result = await operation(em, dataset, ...rest);
    await em.commit();
    return result;
  } catch (error) {
    await em.rollback();
    throw error;
  }
};
