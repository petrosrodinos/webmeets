import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  API_URL: str(),
});

export default env;
