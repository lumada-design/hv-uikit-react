import { forwardRef } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { HvTypography, HvTypographyVariants } from "../Typography";
import { staticClasses, useClasses } from "./Badge.styles";

export { staticClasses as badgeClasses };

export type HvBadgeClasses = ExtractNames<typeof useClasses>;

export interface HvBadgeProps extends HvBaseProps {
  /**
   * Count is the number of unread notifications.
   * Note count and label are mutually exclusive.
   * count is ignored when label is specified at the same time.
   * @deprecated use numeric `label` instead
   */
  count?: number;
  /**
   * True if `count` should be displayed.
   *
   * NOTE: `showCount` is ignored when a **non-numeric** `label` is specified.
   */
  showCount?: boolean;
  /** The maximum number of unread notifications to be displayed */
  maxCount?: number;
  /**
   * Badge content to show in.
   *
   * If value is numeric, then `showCount` and `maxCount` will show or limit the value respectively.
   */
  label?: React.ReactNode;
  /** Icon which the notification will be attached. */
  icon?: React.ReactNode;
  /** Text which the notification will be attached. @deprecated use `children` instead. */
  text?: string;
  /** Text variant. @deprecated use a `HvTypography` on `children` instead. */
  textVariant?: HvTypographyVariants;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBadgeClasses;
}

/**
 * The badge is a component used to notify the user that something has occurred, in the app context.
 */
export const HvBadge = forwardRef<
  // no-indent
  HTMLDivElement,
  HvBadgeProps
>(function HvBadge(props, ref) {
  const {
    classes: classesProp,
    className,
    showCount = false,
    count: countProp = 0,
    maxCount = 99,
    label,
    icon,
    text,
    textVariant,
    children: childrenProp,
    ...others
  } = useDefaultProps("HvBadge", props);

  const { classes, cx } = useClasses(classesProp);

  const count = typeof label === "number" ? label : countProp;
  const countValue = count > maxCount ? `${maxCount}+` : count;
  const renderedCount = showCount && count > 0 ? countValue : "";
  // If label is specified and non-empty, render it.
  // If showCount is specified and count > 0, render the count.
  // Otherwise, render nothing on the badge.
  // (Note count=0 should not be rendered to avoid ghosty 0.)
  const renderedCountOrLabel =
    label && typeof label !== "number" ? label : renderedCount;
  const children =
    childrenProp ||
    icon ||
    (text && <HvTypography variant={textVariant}>{text}</HvTypography>);

  return (
    <div ref={ref} className={cx(classes.root, className)} {...others}>
      {children}
      <div
        className={cx(classes.badgePosition, {
          [classes.badgeContainer]: children,
          [classes.badgeHidden]: !(count > 0 || renderedCountOrLabel),
          // TODO: remove unnecessary classes in v6 (hoist+rename `badge` to `badgePosition`)
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
  );
});
