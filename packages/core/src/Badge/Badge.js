import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import Typography from "../Typography";
import styles from "./styles";

/**
 * The badge is a component used to notify the user that something has occurred, in the app context.
 */
export const Badge = (props) => {
  const {
    classes,
    showCount = false,
    count = 0,
    maxCount = 99,
    label = null,
    icon = null,
    text = null,
    textVariant = null,
    ...others
  } = props;
  const renderedCount = count > maxCount ? `${maxCount}+` : count;
  // If label is specified and non-empty, render it.
  // If showCount is specified and count > 0, render the count.
  // Otherwise, render nothing on the badge.
  // (Note count=0 should not be rendered to avoid ghosty 0.)
  const renderedCountOrLabel = label || (showCount && count > 0 && renderedCount) || null;
  const Component = icon || (text && <Typography variant={textVariant}>{text}</Typography>);

  const badgeClasses = clsx(classes.badgePosition, {
    [classes.badge]: count > 0 || renderedCountOrLabel,
    [classes.showCount]: !label && renderedCountOrLabel,
    [classes.showLabel]: label,
    [classes.badgeIcon]: icon,
    [classes.badgeOneDigit]: String(renderedCountOrLabel).length === 1,
  });

  return (
    <div aria-label={renderedCountOrLabel} className={classes.root} {...others}>
      {Component}
      <div className={Component ? classes.badgeContainer : null}>
        <div className={badgeClasses}>{renderedCountOrLabel}</div>
      </div>
    </div>
  );
};

Badge.propTypes = {
  /**
   *   A Jss Object used to override or extend the styles applied to the badge.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component badge position.
     */
    badgePosition: PropTypes.string,
    /**
     * Styles applied to the component badge.
     */
    badge: PropTypes.string,
    /**
     * Styles applied to the component badge icon.
     */
    badgeIcon: PropTypes.string,
    /**
     * Styles applied to the component when shows count.
     */
    showCount: PropTypes.string,
    /**
     * Styles applied to the component when shows label.
     */
    showLabel: PropTypes.string,
    /**
     * Styles applied to the component when count has one digit.
     */
    badgeOneDigit: PropTypes.string,
    /**
     * Styles applied to the component badge container.
     */
    badgeContainer: PropTypes.string,
  }).isRequired,
  /**
   * Count is the number of unread notifications.
   * Note count and label are mutually exclusive.
   * count is ignored when label is specified at the same time.
   */
  count: PropTypes.number,
  /**
   * True if count should be displayed.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
   */
  showCount: PropTypes.bool,
  /**
   * The maximum number of unread notifications to be displayed
   */
  maxCount: PropTypes.number,
  /**
   * Custom text to show in place of count.
   * Note showCount and label are mutually exclusive.
   * showCount is ignored when label is specified at the same time.
   */
  label: PropTypes.string,
  /**
   * Icon which the notification will be attached.
   */
  icon: PropTypes.node,
  /**
   * Text which the notification will be attached.
   */
  text: PropTypes.string,
  /**
   * Text variant.
   */
  textVariant: PropTypes.string,
};

export default withStyles(styles, { name: "HvBadge" })(Badge);
