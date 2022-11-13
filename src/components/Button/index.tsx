import { CSSProperties, MouseEvent } from "react";

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
  regular: "#FFF",
};

const ButtonClass: ButtonDefault = {
  link: "link",
  regular: "regular",
};

function Button({
  type,
  onPress,
  bgColor = ButtonDefaultBgColor[type],
  color = ButtonDefaultColor[type],
  style = {},
  children,
}: ButtonProps) {
  return (
    <div
      style={{ ...style, color, backgroundColor: bgColor }}
      className={ButtonClass[type]}
      onClick={onPress}
    >
      {children}
    </div>
  );
}

export default Button;
