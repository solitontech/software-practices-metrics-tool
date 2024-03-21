import { RefObject, useEffect } from "react";

interface IDimensions {
  width: number;
  height: number;
}

export const useDimensions = (ref: RefObject<HTMLElement>, setDimensions: (dimensions: IDimensions) => void) => {
  useEffect(() => {
    const currentElement = ref.current;

    const updateDimensions = () => {
      if (currentElement instanceof HTMLElement) {
        setDimensions({
          width: currentElement.offsetWidth,
          height: currentElement.offsetHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);

    if (currentElement) {
      resizeObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        resizeObserver.unobserve(currentElement);
      }
    };
  }, [ref, setDimensions]);
};
