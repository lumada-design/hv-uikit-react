import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HvButton, HvTypography } from "@hv/uikit-react-core";

import { withStyles } from "@material-ui/core";
import styles from "./styles";

const NotificationsIndicator = ({ classes, className, labels, onClick, ...others }) => {
  return (
    <div className={clsx(className, classes.root, classes.notificationsIndicator)} {...others}>
      <HvTypography classes={{ normalText: classes.semanticColoring }}>{labels.label}</HvTypography>
      <HvButton
        category="semantic"
        className={classes.newNotificationsFocus}
        classes={{
          focusVisible: classes.newNotificationsFocus,
        }}
        onClick={onClick}
      >
        {labels.buttonLabel}
      </HvButton>
    </div>
  );
};

NotificationsIndicator.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root of the element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the NotificationsIndicator container.
     */
    notificationsIndicator: PropTypes.string,

    /**
     * Styles applied to the notification focus
     */
    newNotificationsFocus: PropTypes.string,
    /**
     * Override to text color for usage over semantic background in wicked
     */
    semanticColoring: PropTypes.string,
  }).isRequired,

  /**
   * Class names to be applied to the accordion.
   */
  className: PropTypes.string,
  /**
   * Labels to apply to component
   */
  labels: PropTypes.shape({
    /**
     * Notification indicator label
     */
    label: PropTypes.string,
    /**
     * Label to apply to the button label
     */
    buttonLabel: PropTypes.string,
  }).isRequired,
  /**
   * Function passed to the notification panel button
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: "HvNotificationsIndicator" })(NotificationsIndicator);
