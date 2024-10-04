import { ref, reactive } from 'vue';
import { z } from 'zod';

export function useForm<T extends z.ZodType<any, any>>(
  initialState: z.infer<T>,
  options: {
    schema: T;
    onSubmit: (data: z.infer<T>) => Promise<void>;
  }
) {
  const formState = reactive({ initialState });
  const errors = ref<Record<string, string[] | undefined>>({});

  const onSubmit = async () => {
    try {
      const validatedData = options.schema.parse(formState);
      await options.onSubmit(validatedData);
      errors.value = {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value = error.flatten().fieldErrors;
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return {
    formState,
    errors,
    onSubmit,
  };
}