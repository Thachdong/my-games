import { useActionData } from "react-router-dom";

export type TActionResult<T> = {
  validationErrors?: Record<string, string[]>;
  serverError?: string | string[];
  data?: T;
}

export function useCustomActionData<T>() {
  const actionData = useActionData() as TActionResult<T>;

  const { validationErrors, data, serverError } = actionData || {};

  return {
    validationErrors,
    data,
    serverError,
  };
}
