import { AxiosError } from 'axios';

type TServiceResponse<T> = {
  data?: T;
  error?: {
    messages: string | string[];
  };
};

export const createService = <TParams, TReturn>(
  handler: (params: TParams) => Promise<TReturn>
) => {
  return async (params: TParams): Promise<TServiceResponse<TReturn>> => {
    try {
      const data = await handler(params);
      return { data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          error: {
            messages: error.response?.data?.message || ['An error occurred'],
          },
        };
      }
      return {
        error: {
          messages: [JSON.stringify(error) || 'An unexpected error occurred'],
        },
      };
    }
  };
};
