interface ProcessEnv {
  REACT_APP_API_HOST?: string;
}
const env = process.env as ProcessEnv;

export const APP_API_HOST = env.REACT_APP_API_HOST || "";
