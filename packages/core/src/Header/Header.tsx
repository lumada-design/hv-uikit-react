import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./Header.styles";

export { staticClasses as headerClasses };

export type HvHeaderClasses = ExtractNames<typeof useClasses>;

export type HvHeaderPosition =
  | "fixed"
  | "absolute"
  | "sticky"
  | "static"
  | "relative";

export interface HvHeaderProps extends HvBaseProps {
  /** The position of the header bar */
  position?: HvHeaderPosition;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvHeaderClasses;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvHeader = (props: HvHeaderProps) => {
  const {
    className,
    classes: classesProp,
    children,
    position = "fixed",
    ...others
  } = useDefaultProps("HvHeader", props);

  const { classes, cx, css } = useClasses(classesProp);

  return (
    <header
      className={cx(
        classes.root,
        classes.backgroundColor,
        css({
          position,
          ...(position === "fixed" && {
            top: 0,
            left: "auto",
            right: 0,
          }),
        }),
        className,
      )}
      {...others}
    >
      <div className={classes.header}>{children}</div>
    </header>
  );
};
