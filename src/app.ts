import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import goalRoutes from "./routes/goal-routes"
import { errorMiddleware } from "./middlewares/error-handler"
import { limiter } from './middlewares/rate-limiter';
import { requestLogger } from './middlewares/request-logger';
import { logger } from './utils/logger';

const app = express();

// Security middlewares
app.use(helmet()); // sets security headers
app.use(cors());   // enable CORS (configure origins in prod)
app.use(limiter); // apply rate limiting

// Body parsers
app.use(express.json({ limit: '1mb' })); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form data

// Simple request logger
app.use(requestLogger);

// Routes
app.use("/health-goals", goalRoutes);

// Catch-all for unknown routes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorMiddleware(logger));

export default app;