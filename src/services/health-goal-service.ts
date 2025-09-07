import { HealthGoal } from '../models/health-goal';
import { IHealthGoalRepository } from '../repositories/health-goal-repository.interface';
import { AppError } from '../utils/app-error';
import { StatusCodes } from '../constants/http-status-codes';
import { Logger } from 'winston';

export class HealthGoalService {
  constructor(private repo: IHealthGoalRepository, private logger: Logger) { }

  async createGoal(data: Omit<HealthGoal, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.repo.create(data);
  }

  async listGoals() {
    return this.repo.findAll();
  }

  async getGoalById(id: string) {
    const goal = await this.repo.findById(id);
    if (!goal) {
      this.logger.error(`getGoalById:: Health goal with ID: ${id} not found`);
      throw new AppError('Health goal not found', StatusCodes.NOT_FOUND);
    }
    return goal;
  }

  async updateGoal(id: string, data: Partial<Omit<HealthGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) {
    const updated = await this.repo.update(id, data);
    if (!updated) {
      this.logger.error(`updateGoal:: Health goal with ID: ${id} not found for update`);
      throw new AppError('Health goal not found', StatusCodes.NOT_FOUND);
    }
    return updated;
  }

  async deleteGoal(id: string) {
    const deleted = await this.repo.delete(id);
    if (!deleted) {
      this.logger.error(`deleteGoal:: Health goal with ID: ${id} not found for delete`);
      throw new AppError('Health goal not found', StatusCodes.NOT_FOUND);
    }
    return deleted;
  }
}
