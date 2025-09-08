import rateLimit from "express-rate-limit";
import { AppError } from "../utils/app-error";
import { StatusCodes } from "../constants/http-status-codes";

const windowMinutes = Number(process.env.RATE_LIMIT_WINDOW_MINUTES ?? "15")
const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? "100")

const resolvedWindowMs = Number.isFinite(windowMinutes) && windowMinutes > 0
  ? windowMinutes * 60 * 1000
  : 15 * 60 * 1000

const resolvedMax = Number.isFinite(maxRequests) && maxRequests > 0
  ? Math.floor(maxRequests)
  : 100

export const limiter = rateLimit({
  windowMs: resolvedWindowMs,
  max: resolvedMax,
  standardHeaders: true,    // adds `RateLimit-*` headers
  legacyHeaders: false,     // disables `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    next(new AppError(
      "Too many requests, please try again later.",
      StatusCodes.TOO_MANY_REQUESTS
    ));
  },
});
