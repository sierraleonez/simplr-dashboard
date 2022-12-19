import { CSSProperties, MouseEvent } from "react";

type ButtonType = "link" | "regular";

type style = {
  [key in ButtonType]: CSSProperties;
};

const styles: style = {
  link: {},
  regular: {
    padding: "0.3rem",
  },
};

interface ButtonProps {
  type: ButtonType;
  onPress: (event: MouseEvent<HTMLDivElement>) => void;
  color?: string;
  bgColor?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  className?: string;
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

function Button({
  type = "regular",
  onPress,
  bgColor = ButtonDefaultBgColor[type],
  color = ButtonDefaultColor[type],
  style = {},
  children,
  className = "",
}: ButtonProps) {
  return (
    <div
      style={{
        ...style,
        color,
        backgroundColor: bgColor,
        ...styles[type],
        cursor: "pointer",
      }}
      className={`${className}`}
      onClick={onPress}
    >
      {children}
    </div>
  );
}

export default Button;
