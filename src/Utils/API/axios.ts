import axios, { AxiosInstance } from "axios";

type APIContext = 'simplr-micro'


type CustomAxiosInstance = (context: APIContext) => AxiosInstance

const instance: CustomAxiosInstance = (context) => {
  let baseURL = getBaseUrl(context)
  return axios.create({
    baseURL,
    timeout: 1000,
  })
}

function getBaseUrl(context: APIContext) {
  let baseUrl
  switch (context) {
    case "simplr-micro":
      baseUrl = "http://localhost:8000"
      break;
    default:
      baseUrl = "http://localhost:8000"
      break;
  }
  return baseUrl
}

// Usage example:
// instance('simplr-micro' ).get('/')

