interface ProcessEnv {
  WEB_PUBLIC_HOST?: string;
}

const env = process.env as ProcessEnv;

export const WEB_PUBLIC_HOST = env.WEB_PUBLIC_HOST || "http://localhost:3000";
