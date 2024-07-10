import { forwardRef } from "react";
import { Tab, TabProps } from "@mui/base/Tab";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./Tab.styles";

export { staticClasses as canvasTabClasses };

export type HvCanvasTabClasses = ExtractNames<typeof useClasses>;

export interface HvCanvasTabProps extends TabProps {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasTabClasses;
}

/**
 * The tab component to use inside `HvCanvasTabs`.
 */
export const HvCanvasTab = forwardRef<HTMLButtonElement, HvCanvasTabProps>(
  (props, ref) => {
    const {
      classes: classesProp,
      className,
      ...others
    } = useDefaultProps("HvCanvasTab", props);

    const { classes, cx } = useClasses(classesProp);

    return (
      <Tab ref={ref} className={cx(classes.root, className)} {...others} />
    );
  },
);
