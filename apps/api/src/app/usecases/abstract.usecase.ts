import type { EntityManager } from "@mikro-orm/core";

export abstract class AbstractUsecase {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public abstract execute(em: EntityManager, data: any): Promise<any>;
}
