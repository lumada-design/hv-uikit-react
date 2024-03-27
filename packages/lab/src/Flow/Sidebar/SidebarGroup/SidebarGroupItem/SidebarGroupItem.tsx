import { forwardRef } from "react";
import {
  ExtractNames,
  HvBaseProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Drag } from "@hitachivantara/uikit-react-icons";

import { staticClasses, useClasses } from "./SidebarGroupItem.styles";

export { staticClasses as flowSidebarGroupItemClasses };

export type HvFlowSidebarGroupItemClasses = ExtractNames<typeof useClasses>;

export interface HvFlowSidebarGroupItemProps extends HvBaseProps {
  /** Item label. */
  label: string;
  /** Whether the item is being dragged. */
  isDragging?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowSidebarGroupItemClasses;
}

export const HvFlowSidebarGroupItem = forwardRef<
  HTMLDivElement,
  HvFlowSidebarGroupItemProps
>(
  (
    {
      label,
      isDragging,
      classes: classesProp,
      className,
      ...others
    }: HvFlowSidebarGroupItemProps,
    ref,
  ) => {
    const { classes, cx } = useClasses(classesProp);

    return (
      <div
        ref={ref}
        className={cx(
          classes.root,
          { [classes.dragging]: isDragging },
          className,
        )}
        {...others}
      >
        <HvTypography>{label}</HvTypography>
        <Drag />
      </div>
    );
  },
);
