import { z } from 'zod';

export const transactionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['Cash In', 'Cash Out']),
  notes: z.string().min(1, 'Notes are required').max(500, 'Notes must be 500 characters or less'),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;