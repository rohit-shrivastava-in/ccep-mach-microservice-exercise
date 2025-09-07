import rateLimit from "express-rate-limit";
import { AppError } from "../utils/app-error"; // adjust path
import { StatusCodes } from "../constants/http-status-codes";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // max requests per window per IP
  standardHeaders: true,    // adds `RateLimit-*` headers
  legacyHeaders: false,     // disables `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    next(new AppError(
      "Too many requests, please try again later.",
      StatusCodes.TOO_MANY_REQUESTS
    ));
  },
});
