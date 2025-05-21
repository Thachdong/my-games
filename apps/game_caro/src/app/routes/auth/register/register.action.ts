import { ActionFunctionArgs } from "react-router-dom";

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  console.log("Register Action Data: ", data);

  return data;
}
