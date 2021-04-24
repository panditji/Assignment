import path from 'path';
import { Request, Response, NextFunction } from 'express';
import expressMiddleware from 'swagger-express-middleware';
import databaseHandler from '../api/middlewares/database.handler';
import logger from './logger';
import { formatRequestUrl } from './utils';
import environments from './env';
import { RUNTIME } from './constants';

export default function openapi(app, routes): void {
  expressMiddleware(path.join(path.resolve(__dirname, '../docs/'), 'api.yml'), app, (err, middleware) => {
    app.enable('case sensitive routing');
    app.enable('strict routing');
    app.use(middleware.CORS());
    app.use(middleware.metadata());
    app.use(
      middleware.files(app, {
        apiPath: `${environments.BASE_URL}${environments.OPENAPI_SPEC}`,
      }),
    );

    if (environments.NODE_ENV === RUNTIME.PROD) {
      middleware.validateRequest();
    }

    // Log all incoming requests URL
    app.use((req: Request, res: Response, next: NextFunction) => {
      logger.debug(`[REQ] ${formatRequestUrl(req)}`);
      next();
    });

    // Database Connection
    databaseHandler.connect().then(() => {
      databaseHandler.init();
      databaseHandler.sync();
    });

    routes(app);
  });
}
