import { forwardRef } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./ActionBar.styles";

export { staticClasses as actionBarClasses };

export type HvActionBarClasses = ExtractNames<typeof useClasses>;

export interface HvActionBarProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionBarClasses;
}

/**
 * The Action Bar accommodates all the actions related to a specific task on a screen or pattern.
 */
export const HvActionBar = forwardRef<
  React.ComponentRef<"div">,
  HvActionBarProps
>(function HvActionBar(props, ref) {
  const {
    classes: classesProp,
    className,
    children,
    ...others
  } = useDefaultProps("HvActionBar", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <div ref={ref} className={cx(classes.root, className)} {...others}>
      {children}
    </div>
  );
});
