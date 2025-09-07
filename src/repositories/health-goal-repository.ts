import { Logger } from 'winston';
import { HealthGoal } from '../models/health-goal';
import { IHealthGoalRepository } from './health-goal-repository.interface';
import { randomUUID } from 'crypto';

export class InMemoryHealthGoalRepository implements IHealthGoalRepository {
  private store = new Map<string, HealthGoal>();
  constructor(private logger: Logger) { }

  async create(data: Omit<HealthGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<HealthGoal> {
    const now = new Date();
    const goal: HealthGoal = {
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...data
    };
    this.store.set(goal.id, goal);
    this.logger.info(`InMemoryHealthGoalRepository:: Created health goal with ID: ${goal.id}`);
    return goal;
  }

  async findAll(): Promise<HealthGoal[]> {
    this.logger.info(`InMemoryHealthGoalRepository:: Retrieving all health goals`);
    return Array.from(this.store.values());
  }

  async findById(id: string): Promise<HealthGoal | undefined> {
    this.logger.info(`InMemoryHealthGoalRepository:: Retrieving health goal with ID: ${id}`);
    return this.store.get(id);
  }

  async update(id: string, data: Partial<Omit<HealthGoal, 'id' | 'createdAt' | 'updatedAt'>>): Promise<HealthGoal | null> {
    const existing = this.store.get(id);
    if (!existing) {
      this.logger.error(`InMemoryHealthGoalRepository:: Health goal with ID: ${id} not found for update`);
      return null;
    }

    const updated: HealthGoal = { ...existing, ...data, updatedAt: new Date() };
    this.store.set(id, updated);
    this.logger.info(`InMemoryHealthGoalRepository:: Updated health goal with ID: ${id}`);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    this.logger.info(`InMemoryHealthGoalRepository:: Deleting health goal with ID: ${id}`);
    return this.store.delete(id);
  }
}
