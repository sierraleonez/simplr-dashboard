import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

type APIContext = 'simplr-auth'


type CustomAxiosInstance = (context: APIContext) => AxiosInstance

const netInstance: CustomAxiosInstance = (context) => {
  let baseURL = getBaseUrl(context)
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

function getBaseUrl(context: APIContext) {
  let baseUrl
  switch (context) {
    case "simplr-auth":
      baseUrl = "http://localhost:8000"
      break;
    default:
      baseUrl = "http://localhost:8000"
      break;
  }
  return baseUrl
}

type httpMethod = 'get' | 'post' | 'put' | 'delete'

type reqBody<T> = {
  method: httpMethod
  context: APIContext
  path: string
  param: T
}

type Response<T> = {
  data: T | null,
  error: any
}

function APICall<TRequest, TResponse>(req: reqBody<TRequest>): Promise<Response<TResponse>> {
  return new Promise(function (resolve, reject) {
    netInstance(req.context)
      [req.method](req.path, req.param)
      .then(({ data }) => {
        resolve({ data: data.Data, error: null });
      })
      .catch((err) => {
        reject({ data: null, error: err });
      });
  });
}

export { netInstance, APICall  }
// Usage example:
// instance('simplr-micro' ).get('/')

