import { forwardRef } from "react";
import { Tabs, TabsProps } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./Tabs.styles";

export { staticClasses as canvasTabsClasses };

export type HvCanvasTabsClasses = ExtractNames<typeof useClasses>;

export interface HvCanvasTabsProps extends TabsProps {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasTabsClasses;
}

/**
 * A tabs component to use in a canvas context.
 */
export const HvCanvasTabs = forwardRef<HTMLDivElement, HvCanvasTabsProps>(
  (props, ref) => {
    const {
      selectionFollowsFocus = true,
      children,
      className,
      classes: classesProp,
      ...others
    } = useDefaultProps("HvCanvasTabs", props);

    const { classes, cx } = useClasses(classesProp);

    return (
      <Tabs
        ref={ref}
        className={cx(classes.root, className)}
        selectionFollowsFocus={selectionFollowsFocus}
        {...others}
      >
        <TabsList className={classes.list}>{children}</TabsList>
      </Tabs>
    );
  },
);
