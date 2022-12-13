import { Typography, TypographyVariants } from "..";
import { StyledBadge, StyledContainer, StyledRoot } from "./Badge.styles";

export interface BadgeProps extends BaseProps {
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
  textVariant?: TypographyVariants;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    badgeContainer?: string;
    badgePosition?: string;
  };
}

/**
 * The badge is a component used to notify the user that something has occurred, in the app context.
 */
export const Badge = (props: BadgeProps) => {
  const {
    classes,
    className,
    showCount = false,
    count = 0,
    maxCount = 99,
    label = null,
    icon = null,
    text = null,
    textVariant = undefined,
    ...others
  } = props;

  const renderedCount = count > maxCount ? `${maxCount}+` : count;
  // If label is specified and non-empty, render it.
  // If showCount is specified and count > 0, render the count.
  // Otherwise, render nothing on the badge.
  // (Note count=0 should not be rendered to avoid ghosty 0.)
  const renderedCountOrLabel =
    label || (showCount && count > 0 && renderedCount) || null;
  const Component =
    icon || (text && <Typography variant={textVariant}>{text}</Typography>);

  console.log(renderedCountOrLabel);
  return (
    <StyledRoot
      // @ts-ignore
      aria-label={renderedCountOrLabel?.toString()}
      className={classes?.root}
      {...others}
    >
      {Component}
      <StyledContainer
        component={Component ? true : false}
        className={Component ? classes?.badgeContainer : ""}
      >
        <StyledBadge
          className={classes?.badgePosition}
          badge={!!(count > 0 || renderedCountOrLabel)}
          showCount={!!(!label && renderedCountOrLabel)}
          showLabel={!!label}
          badgeIcon={!!icon}
          badgeOneDigit={String(renderedCountOrLabel).length === 1}
        >
          {renderedCountOrLabel}
        </StyledBadge>
      </StyledContainer>
    </StyledRoot>
  );
};
