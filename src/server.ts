import app from "./app"
import { logger } from "./utils/logger";

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})

// Handle synchronous exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { message: err.message, stack: err.stack });

  // Attempt graceful shutdown
  server.close(() => {
    logger.info("Server closed after uncaught exception. Exiting process.");
    process.exit(1);
  });

  // If server doesn't close within X ms, force exit
  setTimeout(() => process.exit(1), 5000);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: any) => {
  logger.error("Unhandled Rejection", { reason });

  // Attempt graceful shutdown
  server.close(() => {
    logger.info("Server closed after unhandled rejection. Exiting process.");
    process.exit(1);
  });

  // Force exit if server doesn't close in 5s
  setTimeout(() => process.exit(1), 5000);
});