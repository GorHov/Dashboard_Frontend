import { useEffect } from "react";

type EventType = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: EventType) => void
): void => {
  useEffect(() => {
    const listener = (event: EventType): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
