import React from "react";
import clsx from "clsx";
import isString from "lodash/isString";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HvTypography from "../Typography";
import styles from "./styles";

const renderNode = (className, node, variant) => (
  <div className={className}>
    {isString(node) ? (
      <HvTypography variant={variant}>{node}</HvTypography>
    ) : (
      node
    )}
  </div>
);

const EmptyState = ({
  classes,
  title = null,
  message = null,
  action = null,
  icon
}) => (
  <div className={classes.root}>
    <div
      className={clsx(classes.container, {
        [classes.containerMessageOnly]: message && !title && !action
      })}
    >
      <div className={classes.iconContainer}>{icon}</div>
      <div className={classes.textContainer}>
        {title && renderNode(classes.titleContainer, title, "sTitle")}
        {message && renderNode(classes.messageContainer, message, "normalText")}
        {action && renderNode(classes.actionContainer, action, "normalText")}
      </div>
    </div>
  </div>
);

EmptyState.propTypes = {
  /* eslint-disable react/require-default-props */
  /**
   * A Jss Object used to override or extend the styles applied to the empty state component.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component container class.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the component container class, when there is no title or action.
     */
    containerMessageOnly: PropTypes.string,
    /**
     * Styles applied to the icon container class.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to the text container class.
     */
    textContainer: PropTypes.string,
    /**
     * Styles applied to the title container class.
     */
    titleContainer: PropTypes.string,
    /**
     * Styles applied to the message container class.
     */
    messageContainer: PropTypes.string,
    /**
     * Styles applied to the action message container class.
     */
    actionContainer: PropTypes.string
  }).isRequired,
  /**
   * The title to be shown.
   */
  title: PropTypes.node,
  /**
   * The message to be shown.
   */
  message: PropTypes.node.isRequired,
  /**
   * The action message to be shown.
   */
  action: PropTypes.node,
  /**
   *  Icon to be presented.
   */
  icon: PropTypes.element.isRequired
};

export default withStyles(styles, { name: "HvEmptyState" })(EmptyState);
