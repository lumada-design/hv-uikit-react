import { forwardRef } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { HvTypography, HvTypographyProps } from "../Typography";
import { staticClasses, useClasses } from "./EmptyState.styles";

export { staticClasses as emptyStateClasses };

export type HvEmptyStateClasses = ExtractNames<typeof useClasses>;

export interface HvEmptyStateProps
  extends HvBaseProps<HTMLDivElement, "title"> {
  /** Icon to be presented. */
  icon: React.ReactNode;
  /** The title to be shown. */
  title?: React.ReactNode;
  /** The message to be shown. */
  message?: React.ReactNode;
  /** The action message to be shown. */
  action?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvEmptyStateClasses;
}

/**
 * Empty states communicate that there’s no information, data or values to display in a given context.
 */
export const HvEmptyState = forwardRef<
  React.ComponentRef<"div">,
  HvEmptyStateProps
>(function HvEmptyState(props, ref) {
  const {
    action,
    icon,
    title,
    message,
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvEmptyState", props);
  const { classes, cx } = useClasses(classesProp);

  const renderNode = (
    variant?: HvTypographyProps["variant"],
    node?: React.ReactNode,
    style?: string,
  ) =>
    node && (
      <HvTypography component="div" variant={variant} className={style}>
        {node}
      </HvTypography>
    );

  return (
    <div
      ref={ref}
      className={cx(classes.root, classes.container, className, {
        [classes.containerMessageOnly]: message && !(title || action),
      })}
      {...others}
    >
      <div className={classes.iconContainer}>{icon}</div>
      <div className={classes.textContainer}>
        {renderNode("title4", title, classes.titleContainer)}
        {renderNode("body", message, classes.messageContainer)}
        {renderNode("body", action, classes.actionContainer)}
      </div>
    </div>
  );
});
