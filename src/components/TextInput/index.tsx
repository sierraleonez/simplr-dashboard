import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  validation: UseFormRegisterReturn;
  label?: string
  isError?: boolean
}
function TextInput(props: TextInputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {props.label && (
        <label htmlFor={props.label}>{props.label}</label>
      )}
      <input {...props} {...props.validation} style={{ animationPlayState: props.isError ? 'running' : 'paused' }}/>
    </div>
  )
}

export default TextInput;
