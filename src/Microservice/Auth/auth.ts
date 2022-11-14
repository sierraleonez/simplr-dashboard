import { netInstance } from "Utils/API/axios";

type Response<T> = {
  data: T | null;
  error: any;
};

type LoginResponse = {
  token: string;
};

type APICall = (reqBody: LoginRequest) => Promise<Response<LoginResponse>>;

type LoginRequest = {
  email: string;
  password: string;
};

const CLogin: APICall = (reqBody) => {
  return new Promise(function (resolve, reject) {
    netInstance("simplr-auth")
      .post("/login", reqBody)
      .then(({ data }) => {
        console.log("res: ", data);
        resolve({ data: data.Data, error: null })
      })
      .catch((err) => {
        console.log("err:", err);
        reject({ data: null, error: err })
      });
  });
};

export { CLogin };
