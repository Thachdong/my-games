import { ZodTypeAny } from 'zod';

export * from './auth.validator';

export const handleZodValidation = <T>(schema: ZodTypeAny, val: T) => {
  const result = schema.safeParse(val);

  if (!result.success) {
    const errors = result.error.flatten();

    const validationErrors: Record<string, string[]> = {};

    for (const key of Object.keys(errors.fieldErrors)) {
      const fieldError = errors.fieldErrors[key as keyof typeof errors.fieldErrors];
      if (fieldError) {
        validationErrors[key] = fieldError as string[];
      }
    }
    return { validationErrors };
  }

  return { data: result.data };
};
