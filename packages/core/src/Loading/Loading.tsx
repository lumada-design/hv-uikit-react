import { HvColorAny, getColor } from "@hitachivantara/uikit-styles";

import range from "lodash/range";

import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvTypography } from "../Typography";

import { staticClasses, useClasses } from "./Loading.styles";

export { staticClasses as loadingClasses };

export type HvLoadingClasses = ExtractNames<typeof useClasses>;

export interface HvLoadingProps extends HvBaseProps {
  /** Indicates if the component should be render in a small size. */
  small?: boolean;
  /** The label to be displayed.  */
  label?: string | React.ReactNode;
  /** Whether the loading animation is hidden. */
  hidden?: boolean;
  /** Color applied to the bars. */
  color?: HvColorAny;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLoadingClasses;
}

/**
 * Loading provides feedback about a process that is taking place in the application.
 */
export const HvLoading = (props: HvLoadingProps) => {
  const {
    color,
    hidden,
    small,
    label,
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvLoading", props);

  const { classes, cx } = useClasses(classesProp);

  const size = small ? "small" : "regular";
  const colorVariant = color ? "Color" : "";
  const variant = `${size}${colorVariant}` as const;

  const inline = {
    backgroundColor: getColor(color, small ? "secondary" : "brand"),
  };
  return (
    <div
      hidden={!!hidden}
      className={cx(
        classes.root,
        {
          [classes.hidden]: hidden,
        },
        className
      )}
      {...others}
    >
      <div className={classes.barContainer}>
        {range(0, 3).map((e) => (
          <div
            key={e}
            style={inline}
            className={cx(classes.loadingBar, classes[variant])}
          />
        ))}
      </div>
      {label && (
        <HvTypography variant="caption1" className={classes.label}>
          {label}
        </HvTypography>
      )}
    </div>
  );
};
