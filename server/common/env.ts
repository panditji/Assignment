import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const { NODE_ENV = 'LOCAL' } = process.env;
dotenv.config({ path: path.join(__dirname, `../../environments/.env.${NODE_ENV.toLowerCase()}`) });

type EnvironmentSchema = {
  NODE_ENV: string;
  SCOPE: string;
  APP_ID: string;
  PORT: string | number;
  LOG_LEVEL: string;
  REQUEST_LIMIT: string;
  BASE_URL: string;
  OPENAPI_SPEC: string;

  /* Database Env */
  DB_HOST: string;
  DB_HOST_SECONDARY: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  REPLICATION: string;

  /* API KEY */
  API_KEY: string;
  VALIDATE_API_KEY: number;

  /* AUTH */
  SESSION_SECRET: string;
  SESSION_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;

  /* HTTPS_ONLY */
  HTTPS_ONLY: number;
  AUTH: number;

  /*GOOGLE CLIENT ID*/
  GOOGLE_CLIENT_ID: string;

  /*APPLE CLIENT ID*/
  APPLE_CLIENT_ID: string;

  /* EMAIL CONFIGS */
  EMAIL_API_KEY: string;
  EMAIL_DOMAIN: string;



};

const EnvironmentDefaults: EnvironmentSchema = {
  NODE_ENV: 'DEV',
  SCOPE: 'DC',
  APP_ID: '',
  PORT: 9095,
  LOG_LEVEL: 'debug',
  REQUEST_LIMIT: '100kb',
  BASE_URL: '/api',
  OPENAPI_SPEC: '/v1/spec',
  DB_HOST: 'localhost',
  DB_HOST_SECONDARY: '',
  DB_PORT: '5432',
  DB_NAME: 'example',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  REPLICATION: '0',
  API_KEY: 'Q6cKTotM4C6Rf4L8MTkRKg==',
  VALIDATE_API_KEY: 0,
  SESSION_SECRET: 'mySecret',
  SESSION_EXPIRY: '24h',
  REFRESH_TOKEN_EXPIRY: '7d',
  HTTPS_ONLY: 0,
  AUTH: 0,
  GOOGLE_CLIENT_ID: '205997782860-r1olahm42udip0taq449h4ffln8j8lon.apps.googleusercontent.com',
  APPLE_CLIENT_ID: 'host.exp.Exponent',
  EMAIL_API_KEY: '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',
  EMAIL_DOMAIN: 'josias@etairosgroup.com',
};

const getEnv = (): any => {
  const env = {};
  Object.keys(EnvironmentDefaults).forEach(key => {
    if (process.env[key]) {
      env[key] = process.env[key];
    }
  });
  return env;
};

const environments: EnvironmentSchema = { ...EnvironmentDefaults, ...getEnv() };

const requiredEnv = [];

// eslint-disable-next-line consistent-return
requiredEnv.forEach(key => {
  if (!environments[key]) {
    // eslint-disable-next-line no-console
    console.log(`[Error] Missing Environment Config: ${key}`);
    return process.exit(1);
  }
});

export default environments;
