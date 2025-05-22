import { TActionResult } from "game_caro/types/react-router-dom";
import { useActionData } from "react-router-dom";

export function useCustomActionData<T>() {
  const actionData = useActionData() as TActionResult<T>;

  const { validationErrors, data, serverError } = actionData || {};

  return {
    validationErrors,
    data,
    serverError
  };
}
