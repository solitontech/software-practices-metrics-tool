import { RefObject, useEffect } from "react";

import { IDimensions } from "./dimensionsTypes";

export const useDimensions = (ref: RefObject<HTMLElement>, setDimensions: (dimensions: IDimensions) => void) => {
  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current instanceof HTMLElement) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [ref, setDimensions]);
};

/* interface exports for consumers */
export type { IDimensions } from "./dimensionsTypes";
