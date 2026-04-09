import rateLimit from 'express-rate-limit';
import { Request } from 'express';

const whitelist = ['/health'];

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,

  skip: (req: Request) => {
    return whitelist.includes(req.path);
  },

  message: {
    statusCode: 429,
    message: 'Too many requests, please try again later.',
  },
});
