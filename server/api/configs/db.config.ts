import environments from '../../common/env';

export interface DBConfigSchema {
  HOST: string;
  HOST_SECONDARY?: string;
  PORT: string | number;
  DATABASE: string;
  USERNAME: string;
  PASSWORD: string;
  REPLICATION?: string;
}

/* In case of REPLICATION: 1, both primary and secondary nodes are assumed to have same username and password */

export const DATABASE_CONFIGS: DBConfigSchema = {
  HOST: environments.DB_HOST,
  PORT: environments.DB_PORT,
  DATABASE: environments.DB_NAME,
  USERNAME: environments.DB_USERNAME,
  PASSWORD: environments.DB_PASSWORD,
  HOST_SECONDARY: environments.DB_HOST_SECONDARY,
  REPLICATION: environments.REPLICATION,
};
