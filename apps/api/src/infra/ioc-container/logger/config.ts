import type interfaces from "inversify-logger-middleware/dts/interfaces/interfaces";

export const options: interfaces.LoggerSettings = {
  request: {
    serviceIdentifier: true,
    bindings: {
      activated: true,
      cache: true,
      constraint: true,
      dynamicValue: true,
      factory: true,
      implementationType: true,
      onActivation: true,
      provider: true,
      scope: true,
      serviceIdentifier: true,
      type: true,
    },
    target: {
      metadata: true,
      name: true,
      serviceIdentifier: true,
    },
  },
  time: true,
};
