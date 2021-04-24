import { HttpStatus } from './constants';

export type ErrorSchema = {
  status: number;
  name: string;
  message: string;
  body: any;
  stack?: any;
};

const error: ErrorSchema = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  name: 'INTERNAL_SERVER_ERROR',
  message: 'INTERNAL_SERVER_ERROR',
  body: {},
};

const HttpErrors = {
  BadRequest(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.BAD_REQUEST;
    error.name = 'BAD_REQUEST';
    error.message = message;
    error.body = body;
    return error;
  },

  Unauthorized(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.UNAUTHORIZED;
    error.name = 'UNAUTHORIZED';
    error.message = message;
    error.body = body;
    return error;
  },

  PaymentRequired(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.PAYMENT_REQUIRED;
    error.name = 'PAYMENT_REQUIRED';
    error.message = message;
    error.body = body;
    return error;
  },

  Forbidden(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.FORBIDDEN;
    error.name = 'FORBIDDEN';
    error.message = message;
    error.body = body;
    return error;
  },

  NotFound(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.NOT_FOUND;
    error.name = 'NOT_FOUND';
    error.message = message;
    error.body = body;
    return error;
  },

  MethodNotAllowed(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.METHOD_NOT_ALLOWED;
    error.name = 'METHOD_NOT_ALLOWED';
    error.message = message;
    error.body = body;
    return error;
  },

  NotAcceptable(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.NOT_ACCEPTABLE;
    error.name = 'NOT_ACCEPTABLE';
    error.message = message;
    error.body = body;
    return error;
  },

  ProxyAuthenticationRequired(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.PROXY_AUTHENTICATION_REQUIRED;
    error.name = 'PROXY_AUTHENTICATION_REQUIRED';
    error.message = message;
    error.body = body;
    return error;
  },

  RequestTimeout(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.REQUEST_TIMEOUT;
    error.name = 'REQUEST_TIMEOUT';
    error.message = message;
    error.body = body;
    return error;
  },

  Conflict(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.CONFLICT;
    error.name = 'CONFLICT';
    error.message = message;
    error.body = body;
    return error;
  },

  Gone(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.GONE;
    error.name = 'GONE';
    error.message = message;
    error.body = body;
    return error;
  },

  LengthRequired(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.LENGTH_REQUIRED;
    error.name = 'LENGTH_REQUIRED';
    error.message = message;
    error.body = body;
    return error;
  },

  PreconditionedFailed(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.PRECONDITION_FAILED;
    error.name = 'PRECONDITION_FAILED';
    error.message = message;
    error.body = body;
    return error;
  },

  PayloadTooLarge(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.PAYLOAD_TOO_LARGE;
    error.name = 'PAYLOAD_TOO_LARGE';
    error.message = message;
    error.body = body;
    return error;
  },

  UriTooLong(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.URI_TOO_LONG;
    error.name = 'URI_TOO_LONG';
    error.message = message;
    error.body = body;
    return error;
  },

  UnsupportedMediaType(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
    error.name = 'UNSUPPORTED_MEDIA_TYPE';
    error.message = message;
    error.body = body;
    return error;
  },

  RequestedRangeNotSatisfiable(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE;
    error.name = 'UNSUPPORTED_MEDIA_TYPE';
    error.message = message;
    error.body = body;
    return error;
  },

  ExpectionFailed(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.EXPECTATION_FAILED;
    error.name = 'EXPECTATION_FAILED';
    error.message = message;
    error.body = body;
    return error;
  },

  Teapot(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.I_AM_A_TEAPOT;
    error.name = 'I_AM_A_TEAPOT';
    error.message = message;
    error.body = body;
    return error;
  },

  Unprocessable(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.UNPROCESSABLE_ENTITY;
    error.name = 'UNPROCESSABLE_ENTITY';
    error.message = message;
    error.body = body;
    return error;
  },
  ResourceLock(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.RESOURCE_LOCK;
    error.name = 'RESOURCE_LOCK';
    error.message = message;
    error.body = body;
    return error;
  },

  TooManyRequests(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.TOO_MANY_REQUESTS;
    error.name = 'TOO_MANY_REQUESTS';
    error.message = message;
    error.body = body;
    return error;
  },

  InternalError(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.INTERNAL_SERVER_ERROR;
    error.name = 'INTERNAL_SERVER_ERROR';
    error.message = message;
    error.body = body;
    return error;
  },

  NotImplemented(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.NOT_IMPLEMENTED;
    error.name = 'NOT_IMPLEMENTED';
    error.message = message;
    error.body = body;
    return error;
  },

  BadGateway(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.BAD_GATEWAY;
    error.name = 'BAD_GATEWAY';
    error.message = message;
    error.body = body;
    return error;
  },

  ServiceUnavailable(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.SERVICE_UNAVAILABLE;
    error.name = 'SERVICE_UNAVAILABLE';
    error.message = message;
    error.body = body;
    return error;
  },

  GatewayTimeout(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.GATEWAY_TIMEOUT;
    error.name = 'GATEWAY_TIMEOUT';
    error.message = message;
    error.body = body;
    return error;
  },

  HttpVersionNotSupported(message = '', body = {}): ErrorSchema {
    error.status = HttpStatus.HTTP_VERSION_NOT_SUPPORTED;
    error.name = 'HTTP_VERSION_NOT_SUPPORTED';
    error.message = message;
    error.body = body;
    return error;
  },
};

export default HttpErrors;
