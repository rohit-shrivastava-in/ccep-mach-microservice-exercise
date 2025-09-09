import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

// custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let metaString = "";
  if (meta && Object.keys(meta).length) {
    metaString = Object.entries(meta)
      .map(([key, val]) => {
        if (key === "errors" && Array.isArray(val)) {
          return `${key}: ${val.map((e: any) => `${e.path}: ${e.message}`).join(", ")}`;
        }
        return `${key}: ${val}`;
      })
      .join(" | ");
    metaString = ` { ${metaString} }`;
  }

  return `${timestamp} [${level}]: ${message} ${metaString ? `\nMeta: ${metaString}` : ""} ${stack ? `\nStack: ${stack}` : ""}`;
});

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // to log error stack
    logFormat
  ),
  transports: [new transports.Console()],
});
