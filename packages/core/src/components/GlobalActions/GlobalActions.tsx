import clsx from "clsx";
import { HvBaseProps } from "../../types";
import isString from "lodash/isString";
import { HvTypography } from "~/components";
import {
  StyledActions,
  StyledBackButton,
  StyledRoot,
  StyledWrapper,
} from "./GlobalActions.styles";
import globalActionsClasses, {
  HvGlobalActionsClasses,
} from "./globalActionsClasses";
import { useTheme as useHvTheme } from "~/hooks";
import { useTheme } from "@mui/material/styles";

export type HvGlobalActionsVariant = "global" | "section";

export type HvGlobalActionsPosition = "sticky" | "fixed" | "relative";

export type HvGlobalActionsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HvGlobalActionsProps = HvBaseProps<HTMLDivElement, { title }> & {
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
};

/**
 * Global Actions are actions that affect the entire page they live in.
 * They should persist while scrolling down the screen.
 */
export const HvGlobalActions = ({
  children,
  classes,
  className,
  title,
  variant = "global",
  backButton,
  headingLevel,
  position: positionProp,
  ...others
}: HvGlobalActionsProps) => {
  const { activeTheme } = useHvTheme();

  const muiTheme = useTheme();

  const headingLevelToApply = headingLevel || (variant === "global" ? 1 : 2);

  const backButtonRenderer = () => {
    if (backButton) {
      return (
        <StyledBackButton
          className={clsx(globalActionsClasses.backButton, classes?.backButton)}
        >
          {backButton}
        </StyledBackButton>
      );
    }
  };

  const position =
    positionProp || (variant === "global" ? "sticky" : "relative");

  return (
    <StyledRoot
      $variant={variant}
      $position={position}
      className={clsx(
        className,
        globalActionsClasses.root,
        classes?.root,
        position === "sticky" &&
          clsx(classes?.positionSticky, globalActionsClasses.positionSticky),
        position === "fixed" &&
          clsx(classes?.positionFixed, globalActionsClasses.positionFixed),
        variant === "global" &&
          clsx(classes?.global, globalActionsClasses.global)
      )}
      $breakpoints={muiTheme.breakpoints}
      {...others}
    >
      <StyledWrapper
        className={clsx(
          globalActionsClasses.wrapper,
          classes?.wrapper,
          variant === "global" &&
            clsx(
              classes?.globalWrapperComplement,
              globalActionsClasses.globalWrapperComplement
            ),
          variant === "section" &&
            clsx(
              classes?.globalSectionArea,
              globalActionsClasses.globalSectionArea
            )
        )}
        $variant={variant}
      >
        {variant === "global" && backButtonRenderer()}
        {!isString(title) ? (
          title
        ) : (
          <HvTypography
            variant={
              variant === "global"
                ? "title3"
                : activeTheme?.globalActions.sectionVariant
            }
            component={`h${headingLevelToApply}`}
            className={clsx(globalActionsClasses.name, classes?.name)}
          >
            {title}
          </HvTypography>
        )}
        {children && (
          <StyledActions
            className={clsx(globalActionsClasses.actions, classes?.actions)}
          >
            {children}
          </StyledActions>
        )}
      </StyledWrapper>
    </StyledRoot>
  );
};
