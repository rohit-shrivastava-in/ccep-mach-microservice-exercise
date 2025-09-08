import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { StatusCodes } from '../constants/http-status-codes';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation failed",
      errors: err.issues.map(issue => ({
        path: issue.path.join("."),
        message: issue.message,
      }))
    });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Internal server error' });
}