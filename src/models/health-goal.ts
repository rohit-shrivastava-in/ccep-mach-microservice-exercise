export const STATUSES = ['pending', 'active', 'completed', 'cancelled'] as const
export type Status = typeof STATUSES[number]

export type HealthGoal = {
  id: string
  userId: string
  title: string
  description?: string
  targetDate?: Date
  status: Status
  createdAt: Date
  updatedAt: Date
}