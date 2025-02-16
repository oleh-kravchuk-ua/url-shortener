import cors from "cors";
import { corsOptions } from "./config";

const corsMiddleware = cors(corsOptions);

export { corsMiddleware as cors };
