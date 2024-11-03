import React, { forwardRef } from "react";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { HvTypography } from "../Typography";
import {
  getBreakpointStyles,
  staticClasses,
  useClasses,
} from "./GlobalActions.styles";

export { staticClasses as globalActionsClasses };
export type HvGlobalActionsClasses = ExtractNames<typeof useClasses>;

export type HvGlobalActionsVariant = "global" | "section";
export type HvGlobalActionsPosition = "sticky" | "fixed" | "relative";
export type HvGlobalActionsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HvGlobalActionsProps
  extends HvBaseProps<HTMLDivElement, "title"> {
  /** Text to display in the component. */
  title?: React.ReactNode;
  /** Denotes if this is a global or section component. */
  variant?: HvGlobalActionsVariant;
  /** User can pass in a fully customized button or false for when the back button should not be rendered. */
  backButton?: React.ReactNode;
  /** Heading Level to apply to Title Area. */
  headingLevel?: HvGlobalActionsHeadingLevel;
  /**
   * Position of the Global Actions.
   * @default variant === "global" ? "sticky" : "relative"
   */
  position?: HvGlobalActionsPosition;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvGlobalActionsClasses;
}

/**
 * Global Actions are actions that affect the entire page they live in.
 * They should persist while scrolling down the screen.
 */
export const HvGlobalActions = forwardRef<
  React.ComponentRef<"div">,
  HvGlobalActionsProps
>(function HvGlobalActions(props, ref) {
  const {
    children,
    classes: classesProp,
    className,
    title,
    variant = "global",
    backButton,
    headingLevel,
    position: positionProp,
    ...others
  } = useDefaultProps("HvGlobalActions", props);
  const muiTheme = useMuiTheme();
  const { classes, cx, css } = useClasses(classesProp);
  const isSmDown = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isUpMd = useMediaQuery(muiTheme.breakpoints.up("md"));

  const headingLevelToApply = headingLevel || (variant === "global" ? 1 : 2);

  const position =
    positionProp || (variant === "global" ? "sticky" : "relative");

  return (
    <div
      ref={ref}
      className={cx(
        classes.root,
        {
          [classes.positionSticky]: position === "sticky",
          [classes.positionFixed]: position === "fixed",
          [classes.global]: variant === "global",
          [classes.section]: variant === "section",
        },
        position === "fixed" && css(getBreakpointStyles(isUpMd, isSmDown)),
        className,
      )}
      {...others}
    >
      <div
        className={cx(classes.wrapper, {
          [classes.globalWrapperComplement]: variant === "global",
          [classes.globalSectionArea]: variant === "section",
        })}
      >
        {variant === "global" && backButton && (
          <div className={classes.backButton}>{backButton}</div>
        )}
        {typeof title !== "string" ? (
          title
        ) : (
          <HvTypography
            variant={variant === "global" ? "title3" : "title4"}
            component={`h${headingLevelToApply}`}
            className={cx(classes.name, {
              [classes.sectionName]: variant !== "global",
            })}
          >
            {title}
          </HvTypography>
        )}
        {children && <div className={classes.actions}>{children}</div>}
      </div>
    </div>
  );
});
