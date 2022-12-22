import { useFocus } from "Utils/CustomHooks";
import { useEffect, useState } from "react";

type Provided = {
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  disabled: boolean;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

type FocusWrapperProps = {
  children: (provided: Provided) => React.ReactNode;
  style?: React.CSSProperties;
};

function FocusWrapper({ children, style }: FocusWrapperProps) {
  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(true);
  const { htmlRef, setFocus } = useFocus();

  useEffect(() => {
    if (!isFieldDisabled) {
      setFocus();
    }
  }, [isFieldDisabled]);

  function onBlur() {
    setIsFieldDisabled(true);
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.code === "Escape") {
      event.currentTarget.blur();
    }
  }
  const Provided = {
    ref: htmlRef,
    disabled: isFieldDisabled,
    onBlur,
    onKeyDown,
  };
  return (
    <div
      onClick={() => {
        setIsFieldDisabled(false);
      }}
      style={style}
    >
      {children(Provided)}
    </div>
  );
}

export default FocusWrapper;
