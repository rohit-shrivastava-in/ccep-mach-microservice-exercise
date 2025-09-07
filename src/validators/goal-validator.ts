import { z } from 'zod';

export const STATUSES = ['pending', 'active', 'completed', 'cancelled'] as const;
export type Status = typeof STATUSES[number];

export const HealthGoalSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(3),
  description: z.string().optional(),
  targetDate: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: "Invalid ISO datetime",
    })
    .transform(val => (val ? new Date(val) : undefined)),
  status: z.enum(STATUSES).default('pending'),
});

export const HealthGoalUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  targetDate: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: "Invalid ISO datetime",
    })
    .transform(val => (val ? new Date(val) : undefined)),
  status: z.enum(STATUSES).optional(),
});

export type HealthGoalInput = z.infer<typeof HealthGoalSchema>;
export type HealthGoalUpdateInput = z.infer<typeof HealthGoalUpdateSchema>;