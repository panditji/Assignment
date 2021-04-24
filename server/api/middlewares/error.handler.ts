/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import HttpErrors from '../../common/errorconfig';
import logger from '../../common/logger';
import { errorFormatter } from './response.handler';

export const httpErrorHandler = (err): Error | any => {
  let error: any = {};
  if (err.response) {
    error.stack = err?.response?.data;
    error.status = err?.response?.status;
    error.name = 'http_response_error';
    error.message = 'Internal API response resulted in failure';
    return error;
  }
  if (err.request) {
    error = HttpErrors.Unprocessable();
    error.name = 'http_request_error';
    error.message = 'Internal API request resulted in failure';
    return error;
  }
  return null;
};

export default function errorHandler(err, req: Request, res: Response, next: NextFunction): void {
  try {
    const error = errorFormatter(err);
    res.status(error?.status || 500).send(error);
  } catch (catchErr) {
    logger.error('[Unhandled Error]');
    logger.error(catchErr);
    res.status(500).send('Internal Server Error');
  }
}
