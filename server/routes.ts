import { Application } from 'express';
import SalesRouter from './api/controllers/sales/sales.router';
import environments from './common/env';

export default function initRoutes(app: Application): void {
  const routes = [
    {
      path: '/v1/sales',
      router: SalesRouter,
    },
  ];
  routes.forEach(item => {
    app.use(`${environments.BASE_URL}${item.path}`, item.router);
  });
}
