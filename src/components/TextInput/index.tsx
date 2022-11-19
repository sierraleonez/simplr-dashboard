import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  validation: UseFormRegisterReturn;
}
function TextInput(props: TextInputProps) {
  return <input {...props} {...props.validation}></input>;
}

export default TextInput;
