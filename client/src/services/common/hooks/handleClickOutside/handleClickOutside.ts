import { RefObject, useEffect } from "react";

export const useHandleClickOutside = (ref: RefObject<HTMLElement>, setIsVisible: (isVisible: boolean) => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setIsVisible]);
};
