import { Sequelize, SyncOptions } from 'sequelize';
import { DATABASE_CONFIGS } from '../configs/db.config';
import logger from '../../common/logger';
import * as Models from '../models/index';

// eslint-disable-next-line import/no-mutable-exports
let sequelize: Sequelize;

if (DATABASE_CONFIGS.REPLICATION === '1') {
  sequelize = new Sequelize(DATABASE_CONFIGS.DATABASE, null, null, {
    replication: {
      read: [
        {
          host: DATABASE_CONFIGS.HOST_SECONDARY,
          username: DATABASE_CONFIGS.USERNAME,
          password: DATABASE_CONFIGS.PASSWORD,
        },
      ],
      write: {
        host: DATABASE_CONFIGS.HOST,
        username: DATABASE_CONFIGS.USERNAME,
        password: DATABASE_CONFIGS.PASSWORD,
      },
    },
    dialect: 'postgres',
    logging: false,
  });
} else {
  sequelize = new Sequelize(DATABASE_CONFIGS.DATABASE, DATABASE_CONFIGS.USERNAME, DATABASE_CONFIGS.PASSWORD, {
    host: DATABASE_CONFIGS.HOST,
    port: Number(DATABASE_CONFIGS.PORT),
    dialect: 'postgres',
    logging: false,
  });
}

export { sequelize };
class DatabaseHandler {
  connect(): Promise<any> {
    logger.info('***DB CONFIGS***');
    logger.info(DATABASE_CONFIGS);
    return new Promise(async (resolve, reject) => {
      try {
        await sequelize.authenticate();
        logger.info('Database connection success');
        resolve(sequelize);
      } catch (err) {
        logger.error(`Database connection error ${err}`);
        reject(err);
      }
    });
  }

  init(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        Object.keys(Models).forEach(model => {
          const Model = Models[model];
          Model.initialize(sequelize);
        });
        logger.info('Initialized Models');
        resolve(true);
      } catch (err) {
        logger.error(`Error during model initialization ${err}`);
        reject(err);
      }
    });
  }

  sync(options?: SyncOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await sequelize.sync(options);
        logger.info('Database sync success');
        resolve(true);
      } catch (err) {
        logger.error(`Database sync erorr ${err}`);
        reject(err);
      }
    });
  }
}

export default new DatabaseHandler() as DatabaseHandler;
