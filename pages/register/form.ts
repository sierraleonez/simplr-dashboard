import { TextInputForm } from "Constants/form";
import { EMAIL_VALIDATION } from "Constants/regex";
import styles from './register.module.css'

export type RegisterFormFields = {
  FirstName: string
  LastName: string
  Email: string
  Password: string
}

export const Form: TextInputForm<RegisterFormFields> = (register, errors) => {
  return [
    {
      label: "First Name",
      containerclass: styles.inputContainer,
      error: errors.FirstName,
      validation: register("FirstName", {
        required: { value: true, message: "This input is required" },
      }),
      placeholder: "Please input your first name",
    },
    {
      label: "Last Name",
      containerclass: styles.inputContainer,
      error: errors.LastName,
      validation: register("LastName", {
        required: { value: true, message: "This input is required" },
      }),
      placeholder: "Please input your last name",
    },
    {
      label: "Email",
      containerclass: styles.inputContainer,
      error: errors.Email,
      type: 'email',
      validation: register("Email", {
        required: { value: true, message: "This input is required" },
        pattern: { value: EMAIL_VALIDATION, message: 'Your email is not valid' }
      }),
      placeholder: "Please input your email",
    },
    {
      label: "Password",
      containerclass: styles.inputContainer,
      error: errors.Password,
      type: 'password',
      validation: register("Password", {
        required: { value: true, message: "This input is required" },
        minLength: { value: 8, message: "Minimum length is 8" },
      }),
      placeholder: "Please input your password",
    },
  ]
}