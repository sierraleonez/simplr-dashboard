import { useRef } from "react";

function useFocus() {
  const htmlRef = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    htmlRef.current && htmlRef.current.focus();
  };

  return { htmlRef, setFocus };
}

export default useFocus