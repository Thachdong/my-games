import { registerService } from "game_caro/services/auth.service";
import { TRegister } from "game_caro/types/auth-service";
import { ActionFunctionArgs } from "react-router-dom";

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data: TRegister = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const res = await registerService(data)

  return res;
}
