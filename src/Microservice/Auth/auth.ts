import { APICall } from "Utils/API/axios";

type LoginResponse = {
  Token: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

async function CLogin(req: LoginRequest) {
  const res = await APICall<LoginRequest, LoginResponse>({
    context: "simplr-auth",
    method: "post",
    path: "/login",
    param: req,
  });
  return res;
}

type RegisterRequest = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
};

type RegisterResponse = {};

async function CRegister(req: RegisterRequest) {
  try {
    const res = await APICall<RegisterRequest, RegisterResponse>({
      context: "simplr-auth",
      method: "post",
      path: "/register",
      param: req,
    });
    return res;
  } catch (err) {
    throw err;
  }
}

export { CLogin, CRegister };
