import { Request, Response, NextFunction } from 'express';
import { HealthGoalService } from '../services/health-goal-service';
import { StatusCodes } from '../constants/http-status-codes';
import { HealthGoalSchema, HealthGoalUpdateSchema } from '../validators/goal-validator';
import { Logger } from "winston";

export class HealthGoalController {
  constructor(private service: HealthGoalService, private logger: Logger) { }

  async createGoal(req: Request, res: Response, next: NextFunction) {
    const parsed = HealthGoalSchema.parse(req.body);
    const goal = await this.service.createGoal(parsed);
    this.logger.info(`createGoal:: Created HealthGoal with id ${goal.id}`);
    res.status(StatusCodes.CREATED).json({ data: goal, message: "HealthGoal created successfully" });
  }

  async getAllGoals(_req: Request, res: Response, next: NextFunction) {
    const goals = await this.service.listGoals();
    res.status(StatusCodes.OK).json({ data: goals, message: "HealthGoals fetched successfully" });
  }

  async getGoalById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const goal = await this.service.getGoalById(id);
    if (!goal) {
      this.logger.warn(`getGoalById:: HealthGoal ${id} not found`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: "HealthGoal not found" });
    }
    res.status(StatusCodes.OK).json({ data: goal, message: "HealthGoal fetched successfully" });
  }

  async updateGoal(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const parsed = HealthGoalUpdateSchema.parse(req.body);
    const updated = await this.service.updateGoal(id, parsed);
    if (!updated) {
      this.logger.warn(`updateGoal:: HealthGoal ${id} not found`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: "HealthGoal not found" });
    }
    this.logger.info(`updateGoal:: Updated HealthGoal ${id}`);
    res.status(StatusCodes.OK).json({ data: updated, message: "HealthGoal updated successfully" });
  }

  async deleteGoal(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const deleted = await this.service.deleteGoal(id);
    if (!deleted) {
      this.logger.warn(`deleteGoal:: HealthGoal ${id} not found`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: "HealthGoal not found" });
    }
    this.logger.info(`deleteGoal:: Deleted HealthGoal ${id}`);
    res.status(StatusCodes.NO_CONTENT).send();
  }
}
