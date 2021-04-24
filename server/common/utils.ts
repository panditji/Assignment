import url from 'url';
import safeJsonStringify from 'safe-json-stringify';
import { Request } from 'express';
import { HttpStatus, ResponseSchema } from './constants';
import logger from './logger';
import crypto from 'crypto';


const replaceUndefinedOrNull = (key?: string, value?: any): any => {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value;
};

/* Removes all fields with undefined values in an object */
export const cleanObject = (obj): any => JSON.parse(safeJsonStringify(obj, replaceUndefinedOrNull));

/* Req url formatter */
export const formatRequestUrl = (req: Request): string =>
  url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });

/* Response Formatter */
export const formatResponse = (
  result,
  status: HttpStatus = HttpStatus.OK,
  page?: number,
  size?: number,
  total?: number,
): ResponseSchema => {
  return {
    data: result ? cleanObject(result) : {},
    status,
    page: page + 1,
    size,
    total,
  };
};

export const safeJSONParse = (str: string): string => {
  try {
    if (!str) {
      return null;
    }
    const obj = JSON.parse(str);
    return obj;
  } catch (err) {
    logger.error(`JSON parse error for string ${str}`);
    return null;
  }
};

export const isObjectEmpty = (obj: any): boolean => {
  try {
    const temp = cleanObject(obj);
    const len = Object.keys(temp).length;
    return !(len > 0);
  } catch (err) {
    return false;
  }
};

export const filterParams = (keys: Array<string>, obj: Record<string, string>): Record<string, string> => {
  const temp = {};
  keys.forEach(key => {
    if (obj[key]) {
      temp[key] = obj[key];
    }
  });
  return temp;
};

export const removeFieldsFromObject = (keys: Array<string>, obj: Record<string, any>): Record<string, any> => {
  keys.forEach(key => {
    // eslint-disable-next-line no-param-reassign
    delete obj[key];
  });
  return obj;
};


export const generateTransactionId = (): string => {
  return crypto.randomBytes(12).toString('hex');
};