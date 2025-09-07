import { HealthGoal } from '../models/health-goal';

export interface IHealthGoalRepository {
  create(data: Omit<HealthGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<HealthGoal>;
  findAll(): Promise<HealthGoal[]>;
  findById(id: string): Promise<HealthGoal | undefined>;
  update(id: string, data: Partial<Omit<HealthGoal, 'id' | 'createdAt' | 'updatedAt'>>): Promise<HealthGoal | null>;
  delete(id: string): Promise<boolean>;
}