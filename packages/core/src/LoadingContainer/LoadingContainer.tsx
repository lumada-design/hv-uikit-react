import { forwardRef } from "react";
import {
  mergeStyles,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvLoading, HvLoadingProps } from "../Loading";
import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./LoadingContainer.styles";

export { staticClasses as loadingContainerClasses };

export type HvLoadingContainerClasses = ExtractNames<typeof useClasses>;

export interface HvLoadingContainerProps
  extends HvBaseProps<HTMLDivElement>,
    Pick<HvLoadingProps, "label" | "small" | "hidden"> {
  opacity?: number;
  classes?: HvLoadingContainerClasses;
}

/**
 * A component that wraps `children` with an `HvLoading` component and
 * and an overlay background with opacity.
 *
 * @example
 * <HvLoadingContainer label="Loading..." hidden={!isLoading}>
 *  <MyComponent>
 * </HvLoadingContainer>
 * */
export const HvLoadingContainer = forwardRef<
  React.ComponentRef<"div">,
  HvLoadingContainerProps
>((props, ref) => {
  const {
    children,
    className,
    classes: classesProp,
    hidden,
    small,
    label,
    "aria-label": ariaLabelProp,
    opacity,
    ...others
  } = useDefaultProps("HvLoadingContainer", props);
  const { classes, cx } = useClasses(classesProp);

  const ariaLabel =
    ariaLabelProp || (typeof label === "string" && label) || "Loading";

  return (
    <div ref={ref} className={cx(classes.root, className)} {...others}>
      <HvLoading
        className={classes.loading}
        role="progressbar"
        small={small}
        label={label}
        hidden={hidden}
        aria-label={ariaLabel}
        style={mergeStyles(undefined, {
          "--opacity": opacity && `${opacity * 100}%`,
        })}
      />
      {children}
    </div>
  );
});
