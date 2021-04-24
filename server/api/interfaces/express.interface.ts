import { Request, Response, NextFunction } from 'express';

export type PAGINATION = {
  limit: number;
  offset: number;
};
export interface ExpressRequest extends Request {
  user?: any;
  pagination?: PAGINATION;
}
export type ExpressResponse = Response;
export type ExpressNextFunction = NextFunction;
