import { CSSProperties, MouseEvent } from "react";
import styles from "./button.module.css";
type ButtonType = "link" | "regular";

interface ButtonProps {
  type: ButtonType;
  onPress: (event: MouseEvent<HTMLDivElement>) => void;
  color?: string;
  bgColor?: string;
  style?: CSSProperties;
  children: React.ReactElement;
}

type ButtonDefault = {
  readonly [key in ButtonType]: string;
};

const ButtonDefaultColor: ButtonDefault = {
  link: "#000",
  regular: "#FFF",
};

const ButtonDefaultBgColor: ButtonDefault = {
  link: "transparent",
  regular: "#000",
};

const ButtonClass: ButtonDefault = {
  link: styles.link,
  regular: styles.regular,
};

function Button({
  type = "regular",
  onPress,
  bgColor = ButtonDefaultBgColor[type],
  color = ButtonDefaultColor[type],
  style = {},
  children,
}: ButtonProps) {
  return (
    <div
      style={{ ...style, color, backgroundColor: bgColor }}
      className={`${ButtonClass[type]} ${styles.default}`}
      onClick={onPress}
    >
      {children}
    </div>
  );
}

export default Button;
