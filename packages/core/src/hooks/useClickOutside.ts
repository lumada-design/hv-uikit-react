import { useEffect, RefObject } from "react";

export type HvClickOutsideEvent = MouseEvent | KeyboardEvent | TouchEvent;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: HvClickOutsideEvent) => void
) => {
  useEffect(() => {
    const listener = (event: HvClickOutsideEvent) => {
      const el = ref?.current;
      const isKeyUp = event.type === "keyup";
      const isEscape = (event as KeyboardEvent).key === "Escape";

      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      return isKeyUp ? (isEscape ? handler(event) : null) : handler(event);
    };

    document.addEventListener("click", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keyup", listener);

    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keyup", listener);
    };
  }, [ref, handler]);
};
