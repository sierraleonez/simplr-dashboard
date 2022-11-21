import { TextInputForm } from "Constants/form";
import { EMAIL_VALIDATION } from "Constants/regex";
type IFormInput = {
  email: string;
  password: string;
};
import styles from "styles/login.module.css";

export const LoginForm: TextInputForm<IFormInput> = (register, errors) => {
  return [
    {
      label: "Username",
      containerclass: styles.inputContainer,
      error: errors.email,
      validation: register("email", {
        required: { value: true, message: "This input is required" },
        pattern: { value: EMAIL_VALIDATION, message: 'Your email is not valid' }
      }),
      placeholder: "Please input username",
    },
    {
      label: "Password",
      containerclass: styles.inputContainer,
      error: errors.password,
      type: "password",
      validation: register("password", {
        required: { value: true, message: "This input is required" },
        minLength: { value: 8, message: "Minimum length is 8" },
      }),
      placeholder: "Please input password",
    },
  ];
};
