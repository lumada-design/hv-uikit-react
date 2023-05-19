import { clsx } from "clsx";
import React from "react";
import { HvBaseProps } from "@core/types";
import { HvTypographyProps } from "@core/components";
import { useTheme as useHvTheme } from "@core/hooks";
import { useTheme } from "@mui/material/styles";
import {
  StyledContainer,
  StyledRoot,
  StyledTextContainer,
  StyledTypography,
} from "./EmptyState.styles";
import emptyStateClasses, { HvEmptyStateClasses } from "./emptyStateClasses";

export interface HvEmptyStateProps
  extends HvBaseProps<HTMLDivElement, "title"> {
  /** Icon to be presented. */
  icon: React.ReactNode;
  /** The title to be shown. */
  title?: string | React.ReactNode;
  /** The message to be shown. */
  message?: string | React.ReactNode;
  /** The action message to be shown. */
  action?: string | React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvEmptyStateClasses;
}

/**
 * Empty states communicate that there’s no information, data or values to display in a given context.
 */
export const HvEmptyState = (props: HvEmptyStateProps) => {
  const { activeTheme } = useHvTheme();

  const muiTheme = useTheme();

  const renderNode = (
    type: "action" | "message" | "title",
    variant?: HvTypographyProps["variant"],
    node?: string | React.ReactNode,
    className?: string
  ) =>
    node && (
      <StyledTypography $type={type} variant={variant} className={className}>
        {node}
      </StyledTypography>
    );

  const { action, icon, title, message, classes, className, ...others } = props;

  return (
    <StyledRoot
      className={clsx(className, emptyStateClasses.root, classes?.root)}
      {...others}
    >
      <StyledContainer
        className={clsx(
          emptyStateClasses.container,
          classes?.container,
          !!(message && !(title || action)) &&
            clsx(
              emptyStateClasses.containerMessageOnly,
              classes?.containerMessageOnly
            )
        )}
        $breakpoints={muiTheme.breakpoints}
        $messageOnly={!!(message && !(title || action))}
      >
        <div
          className={clsx(
            emptyStateClasses.iconContainer,
            classes?.iconContainer
          )}
        >
          {icon}
        </div>
        <StyledTextContainer
          $breakpoints={muiTheme.breakpoints}
          className={clsx(
            emptyStateClasses.textContainer,
            classes?.textContainer
          )}
        >
          {renderNode(
            "title",
            activeTheme?.emptyState.titleVariant,
            title,
            clsx(emptyStateClasses.titleContainer, classes?.titleContainer)
          )}
          {renderNode(
            "message",
            "body",
            message,
            clsx(emptyStateClasses.messageContainer, classes?.messageContainer)
          )}
          {renderNode(
            "action",
            "body",
            action,
            clsx(emptyStateClasses.actionContainer, classes?.actionContainer)
          )}
        </StyledTextContainer>
      </StyledContainer>
    </StyledRoot>
  );
};
