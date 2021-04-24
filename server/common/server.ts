import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import environments from './env';
import installValidator from './openapi';
import l from './logger';

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(path.join(__dirname, '/../..'));
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: environments.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: environments.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: environments.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(environments.SESSION_SECRET));
    app.use(`${environments.BASE_URL}`, express.static(`${root}/public`));
  }

  router(routes: (app: Application) => void): ExpressServer {
    installValidator(app, routes);
    return this;
  }

  listen(p: string | number = environments.PORT): Application {
    const welcome = port => (): void => {
      l.info(`up and running in scope ${environments.SCOPE} & env ${environments.NODE_ENV} @: ${os.hostname()} on port: ${port}}`);
    };
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
