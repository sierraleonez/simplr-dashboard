import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterFormFields } from "./form"

export const useCustomHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormFields>()
  const onSubmit:SubmitHandler<RegisterFormFields> = (data) => console.log(data) 
  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
  }
}