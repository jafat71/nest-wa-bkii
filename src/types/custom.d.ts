// src/types/custom.d.ts

import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: any;
  }
}
