import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvLoading, HvLoadingProps } from "../Loading";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
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
export const HvLoadingContainer = (props: HvLoadingContainerProps) => {
  const {
    children,
    className,
    classes: classesProp,
    hidden,
    small,
    label,
    "aria-label": ariaLabel = label || "Loading",
    opacity,
    ...others
  } = useDefaultProps("HvLoadingContainer", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={cx(classes.root, className)} {...others}>
      <HvLoading
        className={classes.loading}
        role="progressbar"
        small={small}
        label={label}
        hidden={hidden}
        aria-label={ariaLabel}
        style={opacity ? { ["--opacity" as string]: opacity } : undefined}
      />
      {children}
    </div>
  );
};
