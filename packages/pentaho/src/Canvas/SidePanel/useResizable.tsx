import { useRef, useState } from "react";
import { useForkRef } from "@hitachivantara/uikit-react-core";

interface ContainerProps {
  ref: any;
  style: React.CSSProperties;
}

interface SeparatorProps {
  style: React.CSSProperties;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  role: string;
}

interface ResizableProps {
  ref: any;
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}

export const useResizable = (
  resizableOptions: ResizableProps,
): {
  width: number;
  isDragging: boolean;
  getContainerProps: (overrides: any) => ContainerProps;
  getSeparatorProps: () => SeparatorProps;
} => {
  const {
    ref,
    initialWidth = 320,
    minWidth = 100,
    maxWidth = 600,
  } = resizableOptions;

  const [width, setWidth] = useState(initialWidth);
  const [isHover, setIsHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const forkedRef = useForkRef(ref, panelRef);

  const mouseMove = (event: MouseEvent) => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const newWidth = event.clientX - rect.left;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const isHoverBorder =
        event.clientX >= rect.right - 5 && event.clientX <= rect.right + 5;
      setIsHover(isHoverBorder);
    }
  };

  const handleMouseUp = () => {
    if (!panelRef.current) return;

    panelRef.current.style.userSelect = "";
    panelRef.current?.parentElement?.removeEventListener(
      "mousemove",
      mouseMove,
    );
    panelRef.current?.parentElement?.removeEventListener(
      "mouseup",
      handleMouseUp,
    );
    setIsDragging(false);
  };

  const startResizing = () => {
    if (!panelRef.current) return;

    panelRef.current.style.userSelect = "none";
    panelRef.current.parentElement?.addEventListener("mousemove", mouseMove);
    panelRef.current.parentElement?.addEventListener("mouseup", handleMouseUp);
    setIsDragging(true);
  };

  const getContainerProps = (
    overrides: Partial<ContainerProps> = {},
  ): ContainerProps => ({
    ref: forkedRef,
    style: {
      width,
      transition: isDragging ? "none" : undefined,
      ...overrides.style,
    },
  });

  const getSeparatorProps = (
    overrides: Partial<SeparatorProps> = {},
  ): SeparatorProps => ({
    style: {
      left: width,
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 5,
      cursor: "col-resize",
      ...overrides.style,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: () => setIsHover(false),
    onMouseDown: () => {
      if (isHover) startResizing();
    },
    role: "separator",
  });

  return { width, isDragging, getContainerProps, getSeparatorProps };
};
