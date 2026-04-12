import { Request, Response, NextFunction } from 'express';

export function sanitizeMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const sanitize = (value: any) => {
    if (typeof value === 'string') {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, '')
        .replace(/<.*?>/g, '')
        .trim();
    }
    return value;
  };

  // sanitize body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitize(req.body[key]);
    });
  }

  // sanitize query
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = sanitize(req.query[key]);
    });
  }

  next();
}
