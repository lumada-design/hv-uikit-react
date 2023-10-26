import { forwardRef } from "react";

import { useCss } from "@core/hooks/useCss";

import type { HvTreeContentProps } from "./TreeItem";
import { useHvTreeItem } from "./useHvTreeItem";

/**
 * Internal default TreeItem `component`.
 * Use this as a basis to create a custom component.
 */
export const DefaultContent = forwardRef<HTMLDivElement, HvTreeContentProps>(
  (props, ref) => {
    const {
      classes,
      className,
      displayIcon,
      expansionIcon,
      icon: iconProp,
      label,
      nodeId,
      onClick,
      onMouseDown,
      ...others
    } = props;

    const { cx } = useCss();

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useHvTreeItem(nodeId);

    const icon = iconProp ?? expansionIcon ?? displayIcon;

    return (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
      <div
        {...others}
        className={cx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onClick={(event) => {
          handleExpansion(event);
          handleSelection(event);
          onClick?.(event);
        }}
        onMouseDown={(event) => {
          preventSelection(event);
          onMouseDown?.(event);
        }}
        ref={ref}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.label}>{label}</div>
      </div>
    );
  }
);
