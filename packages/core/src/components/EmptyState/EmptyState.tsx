import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import { HvBaseProps } from "../../types";
import { emptyStateClasses, HvEmptyStateClasses } from ".";
import {
  StyledContainer,
  StyledIconContainer,
  StyledRoot,
  StyledTextContainer,
  StyledTypography,
} from "./EmptyState.styles";

export type HvEmptyStateProps = HvBaseProps<HTMLDivElement, { title }> & {
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
};

/**
 * Empty states communicate that there’s no information, data or values to display in a given context.
 */
export const HvEmptyState = (props: HvEmptyStateProps) => {
  const muiTheme = useTheme();

  const renderNode = (node, className, type, variant) =>
    node && (
      <StyledTypography
        breakpoints={muiTheme.breakpoints}
        type={type}
        variant={variant}
        className={className}
      >
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
        breakpoints={muiTheme.breakpoints}
        messageOnly={!!(message && !(title || action))}
      >
        <StyledIconContainer>{icon}</StyledIconContainer>
        <StyledTextContainer
          breakpoints={muiTheme.breakpoints}
          className={clsx(
            emptyStateClasses.textContainer,
            classes?.textContainer
          )}
        >
          {renderNode(
            title,
            clsx(emptyStateClasses.titleContainer, classes?.titleContainer),
            "title",
            "title4"
          )}
          {renderNode(
            message,
            clsx(emptyStateClasses.messageContainer, classes?.messageContainer),
            "message",
            "body"
          )}
          {renderNode(
            action,
            clsx(emptyStateClasses.actionContainer, classes?.actionContainer),
            "action",
            "body"
          )}
        </StyledTextContainer>
      </StyledContainer>
    </StyledRoot>
  );
};
