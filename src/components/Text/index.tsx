import { CSSProperties } from "react";
import styles from "./text.module.css";

type TextType = "error" | "regular";

type TextsProps = {
  children: React.ReactNode;
  type?: TextType;
  style?: CSSProperties;
};

type TextDefault = {
  [key in TextType]: string;
};
const StyleClass: TextDefault = {
  error: styles.error,
  regular: styles.regular,
};
function Texts({ children, type = "regular", style = {} }: TextsProps) {
  return <span className={StyleClass[type]} style={style}>{children}</span>;
}

export default Texts;