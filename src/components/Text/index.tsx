import { CSSProperties } from "react";
import styles from "./text.module.css";

type TextType = "error" | "regular";

type TextsProps = {
  children: React.ReactNode;
  type?: TextType;
  fontSize?: number | string;
  style?: CSSProperties;
  color?: string;
};

type TextDefault = {
  [key in TextType]: string;
};
const StyleClass: TextDefault = {
  error: styles.error,
  regular: styles.regular,
};
function Texts({
  children,
  type = "regular",
  style = {},
  fontSize,
  color,
}: TextsProps) {
  return (
    <span className={StyleClass[type]} style={{ ...style, fontSize, color }}>
      {children}
    </span>
  );
}

export default Texts;
