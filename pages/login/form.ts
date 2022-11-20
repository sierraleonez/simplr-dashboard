import { TextInputProps } from "components/TextInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
type IFormInput = {
  email: string;
  password: string;
};
import styles from "styles/login.module.css";
type InputForm = (
  register: UseFormRegister<IFormInput>,
  errors: FieldErrors<IFormInput>
) => TextInputProps[];
export const LoginForm: InputForm = (register, errors) => {
  return [
    {
      label: "Username",
      containerClass: styles.inputContainer,
      error: errors.email,
      validation: register("email", {
        required: { value: true, message: "This input is required" },
      }),
      className: styles.input,
      placeholder: "Please input username",
    },
    {
      label: "Password",
      containerClass: styles.inputContainer,
      error: errors.password,
      type: "password",
      validation: register("password", {
        required: { value: true, message: "This input is required" },
        minLength: { value: 8, message: "Minimum length is 8" },
      }),
      className: styles.input,
      placeholder: "Please input password",
    },
  ];
};
