type TError = {
  error: unknown;
};

export const createService = <TParams = unknown, TReturn = unknown>(
  handler: (params: TParams) => Promise<TReturn>
) => {
  return async (params: TParams): Promise<TReturn | TError> => {
    try {
      return await handler(params);
    } catch (error) {
      return { error };
    }
  };
};
