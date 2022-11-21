import { TextInputProps } from "components/TextInput";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type TextInputForm<T extends FieldValues> = (
  register: UseFormRegister<T>,
  errors: FieldErrors<T>
) => TextInputProps[];