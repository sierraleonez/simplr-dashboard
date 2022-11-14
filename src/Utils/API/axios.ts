import axios, { AxiosInstance } from "axios";

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

export { netInstance  }
// Usage example:
// instance('simplr-micro' ).get('/')

