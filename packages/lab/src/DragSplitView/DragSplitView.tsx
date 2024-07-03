import React, { useEffect, useRef, useState } from "react";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./DragSplitView.styles";

export { staticClasses as dragSplitView };

export type HvDragSplitViewClasses = ExtractNames<typeof useClasses>;

export interface HvDragSplitViewProps {
  /**
   * The content that will be rendered within the drag split view.
   */
  children: React.ReactNode;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvDragSplitViewClasses;
}

export const HvDragSplitView = (props: HvDragSplitViewProps) => {
  const { children, classes: classesProp } = useDefaultProps(
    "HvDragSplitView",
    props,
  );

  const { classes, cx } = useClasses(classesProp);

  const [first, second] = React.Children.toArray(
    children,
  ) as React.ReactElement[];
  const [topHeight, setTopHeight] = useState<[number, string]>([50, "hv"]);
  const [isDragging, setIsDragging] = useState(false);
  const separatorRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const containerRect = containerRef.current?.getBoundingClientRect?.();
      const newTopHeight = e.clientY - (containerRect?.top ?? 0);
      setTopHeight([newTopHeight, "px"]);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (!containerRef.current) return;
    const step = 10; // Adjust the step size as needed
    if (e.key === "ArrowUp") {
      setTopHeight(([prevHeight]) => [Math.max(prevHeight - step, 0), "px"]);
    } else if (e.key === "ArrowDown") {
      const containerRect = containerRef.current.getBoundingClientRect();
      setTopHeight(([prevHeight]) => [
        Math.min(prevHeight + step, containerRect.height - step),
        "px",
      ]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cx(classes.root, {
        [classes.preventSelection]: isDragging,
      })}
    >
      <div
        className={cx(classes.first)}
        style={{ height: `${topHeight[0]}${topHeight[1]}` }}
      >
        {first}
      </div>
      <button
        type="button"
        ref={separatorRef}
        className={cx(classes.separatorContainer)}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        aria-label="Resize panels"
        tabIndex={0}
      >
        <div className={cx(classes.separator)} />
      </button>
      <div
        className={cx(classes.last)}
        style={{ height: `calc(100% - ${topHeight} - 10px)` }}
      >
        {second}
      </div>
    </div>
  );
};
