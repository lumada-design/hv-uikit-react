import { useRef, useState } from "react";
import { useForkRef } from "@hitachivantara/uikit-react-core";

interface ContainerProps {
  ref: any;
  style: React.CSSProperties;
}

interface HandleProps {
  style: React.CSSProperties;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  role: string;
}

interface ResizableProps {
  resizable: boolean;
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
  getContainerProps: () => ContainerProps;
  getSeparatorProps: () => HandleProps;
} => {
  const {
    resizable,
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

  const mouseMove = (event: any) => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const newWidth = event.clientX - rect.left;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseMove = (event: any) => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      const isHoverBorder =
        event.clientX >= rect.right - 5 && event.clientX <= rect.right + 5;
      setIsHover(isHoverBorder);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setIsDragging(false);
  };

  const startResizing = () => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    setIsDragging(true);
  };

  const getContainerProps = (): ContainerProps => ({
    ref: forkedRef,
    style: {
      width,
    },
  });

  const getSeparatorProps = (): HandleProps => ({
    style: {
      left: width,
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 5,
      cursor: resizable ? "col-resize" : "default",
    },
    onMouseMove: resizable ? handleMouseMove : undefined,
    onMouseLeave: resizable ? () => setIsHover(false) : undefined,
    onMouseDown: resizable
      ? () => {
          if (isHover) startResizing();
        }
      : undefined,
    role: "separator",
  });

  return { width, isDragging, getContainerProps, getSeparatorProps };
};
