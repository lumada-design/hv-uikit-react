import { useEffect } from "react";

export function useResizeObserver(
  ref: React.RefObject<HTMLElement>,
  onResize: (width: number, height: number) => void,
) {
  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      onResize(entry.contentRect.width, entry.contentRect.height);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [onResize, ref]);
}
