import "reflect-metadata";

import "$infra/dotenv";

// The same as `node --stack-trace-limit=50 index.js`
Error.stackTraceLimit = 50; // 10 is by default

import "$infra/node-version";
import "$infra/process-listeners";

import "$infra/ioc";

import "$infra/entrypoint";
