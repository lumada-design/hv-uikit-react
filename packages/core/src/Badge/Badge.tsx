import { HvTypography, HvTypographyVariants } from "../Typography";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./Badge.styles";

export { staticClasses as badgeClasses };

export type HvBadgeClasses = ExtractNames<typeof useClasses>;

export interface HvBadgeProps extends HvBaseProps {
  /**
   * Count is the number of unread notifications.
   * Note count and label are mutually exclusive.
   * count is ignored when label is specified at the same time.
   */
  count?: number;
  /**
   * True if count should be displayed.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
   */
  showCount?: boolean;
  /** The maximum number of unread notifications to be displayed */
  maxCount?: number;
  /**
   * Custom text to show in place of count.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
   */
  label?: string;
  /** Icon which the notification will be attached. */
  icon?: React.ReactNode;
  /** Text which the notification will be attached. */
  text?: string;
  /** Text variant. */
  textVariant?: HvTypographyVariants;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBadgeClasses;
}

/**
 * The badge is a component used to notify the user that something has occurred, in the app context.
 */
export const HvBadge = (props: HvBadgeProps) => {
  const {
    classes: classesProp,
    className,
    showCount = false,
    count = 0,
    maxCount = 99,
    label = null,
    icon = null,
    text = null,
    textVariant = undefined,
    ...others
  } = useDefaultProps("HvBadge", props);

  const { classes, cx } = useClasses(classesProp);

  const renderedCount = count > maxCount ? `${maxCount}+` : count;
  // If label is specified and non-empty, render it.
  // If showCount is specified and count > 0, render the count.
  // Otherwise, render nothing on the badge.
  // (Note count=0 should not be rendered to avoid ghosty 0.)
  const renderedCountOrLabel =
    label || (showCount && count > 0 && renderedCount) || null;
  const Component =
    icon || (text && <HvTypography variant={textVariant}>{text}</HvTypography>);

  return (
    <div className={cx(classes.root, className)} {...others}>
      {Component}
      <div className={Component ? classes.badgeContainer : undefined}>
        <div
          className={cx(classes.badgePosition, {
            [classes.badge]: !!(count > 0 || renderedCountOrLabel),
            [classes.showCount]: !!(!label && renderedCountOrLabel),
            [classes.showLabel]: !!label,
            [classes.badgeIcon]: !!icon,
            [classes.badgeOneDigit]: String(renderedCountOrLabel).length === 1,
          })}
        >
          {renderedCountOrLabel}
        </div>
      </div>
    </div>
  );
};
