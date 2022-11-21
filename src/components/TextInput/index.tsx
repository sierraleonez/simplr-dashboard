import Texts from "components/Text";
import { none } from "Constants/Auth/Auth";
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
  containerclass?: string;
}
function TextInput(props: TextInputProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={props.containerclass}
    >
      {props.label && <label htmlFor={props.label}>{props.label}</label>}
      <input
        {...props}
        {...props.validation}
        style={{
          animationPlayState: props.error ? "running" : "paused",
          boxShadow: props.error ? "2px 2px red" : "2px 2px black",
          border: 'none',
          padding: '0.5rem 1rem',
          fontSize: '16px',
          borderRadius: '12px',
          margin: '0.5rem 0rem 0.6rem 0rem',
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
