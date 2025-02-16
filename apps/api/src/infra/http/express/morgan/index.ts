import morgan from "morgan";

import { format, options } from "./config";

const httpLogger = morgan(format, options);

export { httpLogger as morgan };
