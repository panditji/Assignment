import safeJsonStringify from 'safe-json-stringify';
import environments from './common/env';
import logger from './common/logger';
import Server from './common/server';
import initRoutes from './routes';

const port = Number(environments.PORT);
export default new Server().router(initRoutes).listen(port);

process.on('uncaughtException', err => {
  logger.error('Uncaught Promise Exception');
  logger.error(safeJsonStringify(err));
});
