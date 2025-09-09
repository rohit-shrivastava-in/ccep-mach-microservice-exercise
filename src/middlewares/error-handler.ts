import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { StatusCodes } from "../constants/http-status-codes";
import { ZodError } from "zod";
import { Logger } from "winston";

interface ErrorResponse {
  message: string;
  errors?: { path: string; message: string }[];
}

export const errorMiddleware =
  (logger: Logger) =>
    (err: unknown, req: Request, res: Response, _next: NextFunction) => {
      let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      let response: ErrorResponse = { message: "Something went wrong" };

      if (err instanceof AppError) {
        statusCode = err.statusCode;
        response.message = err.isOperational ? err.message : response.message;
      } else if (err instanceof ZodError) {
        statusCode = StatusCodes.BAD_REQUEST;
        response = {
          message: "Validation failed",
          errors: err.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message,
          }))
        };
      } else if (err instanceof Error) {
        // generic JS Error
        response.message = err.message;
      }

      // Log full error
      logger.error({
        context: `${req.method} ${req.url}`,
        message: response.message,
        stack: err instanceof Error ? err.stack : undefined,
      });

      res.status(statusCode).json(response);
    };
