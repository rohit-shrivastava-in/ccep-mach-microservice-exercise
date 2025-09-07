import { Router } from "express"
import { HealthGoalController } from "../controllers/goal-controller"
import { HealthGoalService } from "../services/health-goal-service"

const router = Router();

import { InMemoryHealthGoalRepository } from "../repositories/health-goal-repository"
import { logger } from "../utils/logger";

const repo = new InMemoryHealthGoalRepository(logger)
const service = new HealthGoalService(repo, logger)
const controller = new HealthGoalController(service, logger)

router.post("/", controller.createGoal.bind(controller));
router.get("/", controller.getAllGoals.bind(controller));
router.get("/:id", controller.getGoalById.bind(controller));
router.put("/:id", controller.updateGoal.bind(controller));
router.delete("/:id", controller.deleteGoal.bind(controller));

export default router;
