import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

// custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // to log error stack
    logFormat
  ),
  transports: [
    new transports.Console(),
  ],
});
