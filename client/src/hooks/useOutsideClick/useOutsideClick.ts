import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<HTMLElement>, setIsInside: (isInside: boolean) => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        setIsInside(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setIsInside]);
};
