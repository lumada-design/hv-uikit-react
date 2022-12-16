import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import {
  StyledContainer,
  StyledIconContainer,
  StyledRoot,
  StyledTextContainer,
  StyledTypography,
} from "./EmptyState.styles";

export interface EmptyStateProps extends BaseProps<HTMLDivElement, { title }> {
  /** Icon to be presented. */
  icon: React.ReactNode;
  /** The title to be shown. */
  title?: string | React.ReactNode;
  /** The message to be shown. */
  message?: string | React.ReactNode;
  /** The action message to be shown. */
  action?: string | React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    container?: string;
    containerMessageOnly?: string;
    iconContainer?: string;
    titleContainer?: string;
    textContainer?: string;
    messageContainer?: string;
    actionContainer?: string;
  };
}

/**
 * Empty states communicate that there’s no information, data or values to display in a given context.
 */
export const EmptyState = (props: EmptyStateProps) => {
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
    <StyledRoot className={className} {...others}>
      <StyledContainer
        breakpoints={muiTheme.breakpoints}
        messageOnly={!!(message && !(title || action))}
      >
        <StyledIconContainer>{icon}</StyledIconContainer>
        <StyledTextContainer
          breakpoints={muiTheme.breakpoints}
          className={clsx("textContainer", classes?.textContainer)}
        >
          {renderNode(title, classes?.titleContainer, "title", "title4")}
          {renderNode(message, classes?.messageContainer, "message", "body")}
          {renderNode(action, classes?.actionContainer, "action", "body")}
        </StyledTextContainer>
      </StyledContainer>
    </StyledRoot>
  );
};
