import { useState } from "react";
import { APICall, netInstance } from "Utils/API/axios";

type Response<T> = {
  data: T | null;
  error: any;
};

type LoginResponse = {
  token: string;
};
type test<T1, T2> = string;

type APICall<T1, T2> = (reqBody: T1) => Promise<Response<T2>>;

type LoginRequest = {
  email: string;
  password: string;
};

async function CLogin(req: LoginRequest) {
  try {
    const res = await APICall<LoginRequest, string>(
      {
        context: "simplr-auth",
        method: "post",
        path: "/login",
        param: req
      },
    );
    return res
  } catch (err: any) {
    return err
  }
}

export { CLogin };
