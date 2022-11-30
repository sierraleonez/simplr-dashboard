import axios, { AxiosInstance } from "axios";

type APIContext = "simplr-auth";

type CustomAxiosInstance = (context: APIContext) => AxiosInstance;
/**
 * Custom axios instance with basic configuration setup (header, baseUrl, authorization)
 * @param context Microservice destination of API call
 * @returns AxiosInstance
 */
const netInstance: CustomAxiosInstance = (context) => {
  const baseURL = getBaseUrl(context);
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

function getBaseUrl(context: APIContext) {
  let baseUrl;
  switch (context) {
    case "simplr-auth":
      baseUrl = "http://localhost:8000";
      break;
    default:
      baseUrl = "http://localhost:8000";
      break;
  }
  return baseUrl;
}

type HttpMethod = "get" | "post" | "put" | "delete";

type Request<T> = {
  method: HttpMethod;
  context: APIContext;
  path: string;
  param: T;
};

type Response<T> = {
  data: T | null;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  error: any;
};

/**
 * Call endpoints with provided request body and return mapped result
 * @param req Request parameter
 * @returns Promise
 */
function APICall<TRequest, TResponse>(
  req: Request<TRequest>
): Promise<Response<TResponse>> {
  return new Promise(function (resolve, reject) {
    netInstance(req.context)[req.method](req.path, req.param)
      .then(({ data }) => {
        resolve({ data: data.Data, error: null });
      })
      .catch((err) => {
        reject({ data: null, error: err });
      });
  });
}

export { netInstance, APICall };
