import { HealthGoal } from '../models/health-goal';
import { IHealthGoalRepository } from './health-goal-repository.interface';
import { IStore } from '../store/store.interface';

export class HealthGoalRepository implements IHealthGoalRepository {
  constructor(private store: IStore<HealthGoal>) { }

  async create(goal: HealthGoal): Promise<HealthGoal> {
    return this.store.create(goal);
  }

  async findAll(): Promise<HealthGoal[]> {
    return this.store.findAll();
  }

  async findById(id: string): Promise<HealthGoal | null> {
    return this.store.findById(id);
  }

  async update(id: string, data: Partial<HealthGoal>): Promise<HealthGoal | null> {
    return this.store.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.store.delete(id);
  }
}
