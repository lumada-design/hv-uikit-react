import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import { HvBaseProps } from "types";
import { isString } from "lodash";
import { Typography } from "..";
import {
  StyledActions,
  StyledBackButton,
  StyledRoot,
  StyledWrapper,
} from "./GlobalActions.styles";

export type GlobalActionsVariant = "global" | "section";

export type GlobalActionsPosition = "sticky" | "fixed" | "relative";

export type GlobalActionsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type GlobalActionsProps = HvBaseProps<HTMLDivElement, { title }> & {
  /** Text to display in the component. */
  title?: React.ReactNode;
  /** Denotes if this is a global or section component. */
  variant?: GlobalActionsVariant;
  /** User can pass in a fully customized button or false for when the back button should not be rendered. */
  backButton?: React.ReactNode;
  /** Heading Level to apply to Title Area. */
  headingLevel?: GlobalActionsHeadingLevel;
  /**
   * Position of the Global Actions.
   * Defaults to `sticky` when it is a global title and `relative` when it's a section title.
   */
  position?: GlobalActionsPosition;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    backButton?: string;
    actions?: string;
    wrapper?: string;
    name?: string;
  };
};

/**
 * Global Actions are actions that affect the entire page they live in.
 * They should persist while scrolling down the screen.
 */
export const GlobalActions = ({
  children,
  classes,
  className,
  title,
  variant = "global",
  backButton,
  headingLevel,
  position: positionProp,
  ...others
}: GlobalActionsProps) => {
  const muiTheme = useTheme();
  const headingLevelToApply = headingLevel || (variant === "global" ? 1 : 2);

  const backButtonRenderer = () => {
    if (backButton) {
      return (
        <StyledBackButton className={classes?.backButton}>
          {backButton}
        </StyledBackButton>
      );
    }
  };

  const position =
    positionProp || (variant === "global" ? "sticky" : "relative");

  return (
    <StyledRoot
      variant={variant}
      position={position}
      className={clsx(className, classes?.root)}
      breakpoints={muiTheme.breakpoints}
      {...others}
    >
      <StyledWrapper className={classes?.wrapper} variant={variant}>
        {variant === "global" && backButtonRenderer()}
        {!isString(title) ? (
          title
        ) : (
          <Typography
            variant={variant === "global" ? "title3" : "title4"} // "sectionTitle"
            as={`h${headingLevelToApply}`}
            className={classes?.name}
          >
            {title}
          </Typography>
        )}
        {children && (
          <StyledActions className={classes?.actions}>{children}</StyledActions>
        )}
      </StyledWrapper>
    </StyledRoot>
  );
};
