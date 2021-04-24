import SafeJSONStringify from 'safe-json-stringify';
import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '../interfaces/express.interface';
import { ResponseSchema, HttpStatus } from '../../common/constants';
import HttpErrors, { ErrorSchema } from '../../common/errorconfig';
import { httpErrorHandler } from './error.handler';

export const responseFormatter = (
  status: number,
  data?: Record<string, unknown> | Array<any>,
  page?: number,
  size?: number,
  total?: number,
): ResponseSchema => {
  const response: ResponseSchema = {
    data,
    status,
    page,
    size,
    total,
  };
  return response;
};

export const errorFormatter = (err: any): ErrorSchema => {
  let error: ErrorSchema;

  if (err?.status) {
    return err;
  }

  if (err?.code && err?.code === 11000) {
    error = HttpErrors.Conflict();
    error.message = err?.message;
    return error;
  }

  if (err?.code && err?.code === 'LIMIT_UNEXPECTED_FILE') {
    error = HttpErrors.BadRequest('Invalid file key field passed while uploading file');
    return error;
  }

  if (err?.stack?.match(/ValidationError/gi)) {
    error = HttpErrors.PreconditionedFailed('Schema validation failed');
    error.stack = err?.message || err?.stack;
    return error;
  }

  const httpError = httpErrorHandler(err);

  if (httpError) {
    return httpError;
  }
  error = HttpErrors.InternalError();
  error.message = err?.message || '';
  error.stack = err?.stack || SafeJSONStringify(err);
  error.body = err;
  return error;
};

export const controllerWrapper = handler => {
  return async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<any> => {
    try {
      const result = await handler(req, res, next);
      res.status(result?.status || HttpStatus.OK).send(result);
    } catch (err) {
      const error = errorFormatter(err);
      res.status(error.status || 500).send(error);
    }
  };
};
