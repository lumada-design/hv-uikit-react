import React from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps } from "@core/types/generic";
import { HvTypography, HvTypographyProps } from "@core/components/Typography";
import { useTheme as useHvTheme } from "@core/hooks/useTheme";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./EmptyState.styles";

export { staticClasses as emptyStateClasses };

export type HvEmptyStateClasses = ExtractNames<typeof useClasses>;

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
  const {
    action,
    icon,
    title,
    message,
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvEmptyState", props);

  const { classes, cx, css } = useClasses(classesProp);

  const { activeTheme } = useHvTheme();

  const muiTheme = useTheme();

  const onlyXs = useMediaQuery(muiTheme.breakpoints.only("xs"));
  const upSm = useMediaQuery(muiTheme.breakpoints.up("sm"));

  const messageOnly = !!(message && !(title || action));

  const renderNode = (
    variant?: HvTypographyProps["variant"],
    node?: React.ReactNode,
    style?: string
  ) =>
    node && (
      <HvTypography variant={variant} className={style}>
        {node}
      </HvTypography>
    );

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div
        className={cx(
          classes.container,
          onlyXs &&
            css({
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }),
          {
            [classes.containerMessageOnly]: messageOnly,
          },
          onlyXs && messageOnly && css({ flexDirection: "row" })
        )}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div
          className={cx(
            classes.textContainer,
            upSm && css({ marginLeft: theme.space.xs })
          )}
        >
          {renderNode(
            activeTheme?.emptyState.titleVariant,
            title,
            classes.titleContainer
          )}
          {renderNode("body", message, classes.messageContainer)}
          {renderNode("body", action, classes.actionContainer)}
        </div>
      </div>
    </div>
  );
};
