import { Request, Response, NextFunction } from "express";

// generic type-safe async wrapper
export const wrapAsync =
  <T extends (req: Request, res: Response, next: NextFunction) => Promise<any>>(fn: T) =>
    (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };