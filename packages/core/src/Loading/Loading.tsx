import {
  mergeStyles,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { HvBaseProps } from "../types/generic";
import { HvTypography } from "../Typography";
import { range } from "../utils/helpers";
import { staticClasses, useClasses } from "./Loading.styles";

export { staticClasses as loadingClasses };

export type HvLoadingClasses = ExtractNames<typeof useClasses>;

export interface HvLoadingProps extends HvBaseProps {
  /** Indicates if the component should be render in a small size. */
  small?: boolean;
  /** The label to be displayed.  */
  label?: React.ReactNode;
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
    style,
    className,
    ...others
  } = useDefaultProps("HvLoading", props);

  const { classes, cx } = useClasses(classesProp);

  const size = small ? "small" : "regular";
  const colorVariant = color && (`${size}Color` as const);

  return (
    <div
      hidden={!!hidden}
      style={mergeStyles(style, {
        color: getColor(color, small ? "secondary" : "brand"),
        "--customColor": getColor(color),
      })}
      className={cx(
        classes.root,
        {
          [classes.hidden]: hidden,
        },
        className,
      )}
      {...others}
    >
      <div className={classes.barContainer}>
        {range(3).map((e) => (
          <div
            key={e}
            className={cx(
              classes.loadingBar,
              // TODO: hoist to parent & remove unused `colorVariant` in v6
              classes[size],
              classes[colorVariant!],
            )}
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
