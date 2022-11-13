import { netInstance } from "Utils/API/axios"

type Response<T> = {
  data: T | null, 
  error: any
}

type APICall<T> = (reqBody: T) => Response<T>
type LoginRequest = {
  email: string;
  password: string;
}
const CLogin: APICall<LoginRequest> = (reqBody) => {
  let res: Response<LoginRequest> = {
    data: null,
    error: undefined
  }
  netInstance('simplr-auth').post('/login', reqBody)
    .then(data => { 
      console.log('res: ', data)
      res = { data: data.data, error: null } 
    })
    .catch(err => {
      console.log('err:', err)
      res = { data: null, error: err }
    })
  return res
  
}

export { CLogin }