interface ProcessEnv {
  NODE_ENV?: string;
  API_PORT?: string;
}

const env = process.env as ProcessEnv;

export const isProduction = ["prd", "prod", "production"].includes(`${env.NODE_ENV}`);

export const PORT = env.API_PORT || 3000;
