import { Request, Response, NextFunction } from 'express';
import { HealthGoalService } from '../services/health-goal-service';
import { StatusCodes } from '../constants/http-status-codes';
import { HealthGoalSchema, HealthGoalUpdateSchema } from '../validators/goal-validator';
import { Logger } from "winston";

export class HealthGoalController {
  constructor(private service: HealthGoalService, private logger: Logger) { }

  async createGoal(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = HealthGoalSchema.parse(req.body);
      this.logger.info(`createGoal:: Creating HealthGoal for user ${parsed.userId}`);
      const goal = await this.service.createGoal(parsed);
      this.logger.info(`createGoal:: Created HealthGoal with id ${goal.id}`);
      res.status(StatusCodes.CREATED).json({ data: goal, message: "HealthGoal created successfully" });
    } catch (err) {
      this.logger.error(`createGoal:: Error creating HealthGoal, err: ${err}`);
      next(err);
    }
  }

  async getAllGoals(_req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info(`getAllGoals:: Fetching all HealthGoals`);
      const goals = await this.service.listGoals();
      res.status(StatusCodes.OK).json({ data: goals, message: "HealthGoals fetched successfully" });
    } catch (err) {
      this.logger.error(`getAllGoals:: Error fetching HealthGoals, err: ${err}`);
      next(err);
    }
  }

  async getGoalById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      this.logger.info(`getGoalById:: Fetching HealthGoal with id ${id}`);
      const goal = await this.service.getGoalById(id);
      if (!goal) {
        this.logger.warn(`getGoalById:: HealthGoal ${id} not found`);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "HealthGoal not found" });
      }
      res.status(StatusCodes.OK).json({ data: goal, message: "HealthGoal fetched successfully" });
    } catch (err) {
      this.logger.error(`getGoalById:: Error fetching HealthGoal ${req.params.id}, err: ${err}`);
      next(err);
    }
  }

  async updateGoal(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const parsed = HealthGoalUpdateSchema.parse(req.body);
      this.logger.info(`updateGoal:: Updating HealthGoal ${id}`);
      const updated = await this.service.updateGoal(id, parsed);
      if (!updated) {
        this.logger.warn(`updateGoal:: HealthGoal ${id} not found`);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "HealthGoal not found" });
      }
      this.logger.info(`updateGoal:: Updated HealthGoal ${id}`);
      res.status(StatusCodes.OK).json({ data: updated, message: "HealthGoal updated successfully" });
    } catch (err) {
      this.logger.error(`updateGoal:: Error updating HealthGoal ${req.params.id}, err: ${err}`);
      next(err);
    }
  }

  async deleteGoal(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      this.logger.info(`deleteGoal:: Deleting HealthGoal ${id}`);
      const deleted = await this.service.deleteGoal(id);
      if (!deleted) {
        this.logger.warn(`deleteGoal:: HealthGoal ${id} not found`);
        return res.status(StatusCodes.NOT_FOUND).json({ message: "HealthGoal not found" });
      }
      this.logger.info(`deleteGoal:: Deleted HealthGoal ${id}`);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
      this.logger.error(`deleteGoal:: Error deleting HealthGoal ${req.params.id}, err: ${err}`);
      next(err);
    }
  }
}
