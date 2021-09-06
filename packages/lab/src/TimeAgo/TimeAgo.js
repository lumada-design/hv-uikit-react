import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HvTypography } from "@hv/uikit-react-core";
import useTimeAgo from "./useTimeAgo";
import styles from "./styles";

/**
 * The HvTimeAgo component implements the Design System relative time format guidelines.
 */
const HvTimeAgo = ({
  classes,
  timestamp,
  component: Component = HvTypography,
  emptyElement = "—",
  showSeconds = false,
  justText = false,
  ...others
}) => {
  const timeAgo = useTimeAgo(timestamp, { showSeconds });

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
