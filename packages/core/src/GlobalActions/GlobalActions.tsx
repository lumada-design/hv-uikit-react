import { useTheme as useMuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import isString from "lodash/isString";
import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps } from "@core/types/generic";
import { HvTypography } from "@core/Typography";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./GlobalActions.styles";

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
   * Defaults to `sticky` when it is a global title and `relative` when it's a section title.
   */
  position?: HvGlobalActionsPosition;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvGlobalActionsClasses;
}

const getBreakpointStyles = (isUpMd: boolean, isSmDown: boolean) =>
  isUpMd
    ? {
        width: `calc(100% - 2 * ${theme.spacing(4)})`,
        marginLeft: `${theme.spacing(4)}`,
        marginRight: `${theme.spacing(4)}`,
      }
    : isSmDown
    ? {
        width: `calc(100% - 2 * ${theme.spacing(2)})`,
        marginLeft: `${theme.spacing(2)}`,
        marginRight: `${theme.spacing(2)}`,
      }
    : {};

/**
 * Global Actions are actions that affect the entire page they live in.
 * They should persist while scrolling down the screen.
 */
export const HvGlobalActions = (props: HvGlobalActionsProps) => {
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

  const fixedPositionCss =
    positionProp === "fixed" && getBreakpointStyles(isUpMd, isSmDown);

  const headingLevelToApply = headingLevel || (variant === "global" ? 1 : 2);

  const position =
    positionProp || (variant === "global" ? "sticky" : "relative");

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.positionSticky]: position === "sticky",
          [classes.positionFixed]: position === "fixed",
          [classes.global]: variant === "global",
        },
        css(fixedPositionCss),
        className
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
        {!isString(title) ? (
          title
        ) : (
          <HvTypography
            variant="title3"
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
};
