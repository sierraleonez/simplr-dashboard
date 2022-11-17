import { APICall } from "Utils/API/axios";

type LoginResponse = {
  Token: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

async function CLogin(req: LoginRequest) {
  try {
    const res = await APICall<LoginRequest, LoginResponse>({
      context: "simplr-auth",
      method: "post",
      path: "/login",
      param: req,
    });
    return res;
  } catch (err) {
    return { data: null, error: err };
  }
}

export { CLogin };
