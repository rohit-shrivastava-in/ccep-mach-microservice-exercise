import { Router } from "express"
import { HealthGoalController } from "../controllers/goal-controller"
import { HealthGoalService } from "../services/health-goal-service"

import { HealthGoalRepository } from "../repositories/health-goal-repository"
import { logger } from "../utils/logger";
import { InMemoryStore } from "../store/in-memory-store";
import { HealthGoal } from "../models/health-goal";
import { wrapAsync } from "../utils/wrapAsync";

const router = Router();

const store = new InMemoryStore<HealthGoal>();
const repo = new HealthGoalRepository(store);
const service = new HealthGoalService(repo, logger);
const controller = new HealthGoalController(service, logger);

router.post("/", wrapAsync(controller.createGoal.bind(controller)));
router.get("/", wrapAsync(controller.getAllGoals.bind(controller)));
router.get("/:id", wrapAsync(controller.getGoalById.bind(controller)));
router.put("/:id", wrapAsync(controller.updateGoal.bind(controller)));
router.delete("/:id", wrapAsync(controller.deleteGoal.bind(controller)));

export default router;
