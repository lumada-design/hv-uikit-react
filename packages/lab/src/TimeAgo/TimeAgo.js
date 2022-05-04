import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { HvTypography, useLocale } from "@hitachivantara/uikit-react-core";
import useTimeAgo from "./useTimeAgo";
import styles from "./styles";

/**
 * The HvTimeAgo component implements the Design System relative time format guidelines.
 */
const HvTimeAgo = ({
  classes,
  timestamp,
  locale: localeProp,
  component: Component = HvTypography,
  emptyElement = "—",
  disableRefresh = false,
  showSeconds = false,
  justText = false,
  ...others
}) => {
  const contextLocale = useLocale();
  const locale = localeProp || contextLocale;
  const timeAgo = useTimeAgo(timestamp, { locale, disableRefresh, showSeconds });

  if (justText && timestamp) return timeAgo;

  return (
    <Component className={classes.root} {...others}>
      {!timestamp ? emptyElement : timeAgo}
    </Component>
  );
};

HvTimeAgo.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }),
  /**
   * The timestamp to format, in seconds
   */
  timestamp: PropTypes.number,
  /**
   * The locale to be used. Should be on of the dayjs supported locales
   * @see https://day.js.org/docs/en/i18n/i18n
   */
  locale: PropTypes.string,
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `div`.
   */
  component: PropTypes.elementType,
  /**
   * The element to render when the timestamp is null or 0
   * Defaults to `—` (Em Dash)
   */
  emptyElement: PropTypes.node,
  /**
   * Disables periodic date refreshes
   */
  disableRefresh: PropTypes.bool,
  /**
   * Whether to show seconds in the rendered time
   */
  showSeconds: PropTypes.bool,
  /**
   * Whether the component should render just the string
   * Consider using `useTimeAgo` instead
   */
  justText: PropTypes.bool,
};

export default withStyles(styles, { name: "HvTimeAgo" })(HvTimeAgo);
