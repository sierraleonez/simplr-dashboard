import Texts from "components/Text";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  validation: UseFormRegisterReturn;
  label?: string;
  error?: FieldError;
  containerClass?: string;
}
function TextInput(props: TextInputProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={props.containerClass}
    >
      {props.label && <label htmlFor={props.label}>{props.label}</label>}
      <input
        {...props}
        {...props.validation}
        style={{
          animationPlayState: props.error ? "running" : "paused",
          boxShadow: props.error ? "2px 2px red" : "2px 2px black",
        }}
        onAnimationEnd={() => {}}
      />
      {props.error && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Texts type="error" fontSize={14}>
            {props.error?.message}
          </Texts>
        </div>
      )}
    </div>
  );
}

export default TextInput;
