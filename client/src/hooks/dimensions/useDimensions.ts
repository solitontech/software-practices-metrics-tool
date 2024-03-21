import { RefObject, useEffect } from "react";

import { IDimensions } from "./dimensionsTypes";

export const useDimensions = (ref: RefObject<HTMLElement>, setDimensions: (dimensions: IDimensions) => void) => {
  useEffect(() => {
    const currentRef = ref.current;

    const updateDimensions = () => {
      if (currentRef instanceof HTMLElement) {
        setDimensions({
          width: currentRef.offsetWidth,
          height: currentRef.offsetHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [ref, setDimensions]);
};

/* interface exports for consumers */
export type { IDimensions } from "./dimensionsTypes";
