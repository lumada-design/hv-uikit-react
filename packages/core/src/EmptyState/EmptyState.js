import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HvTypography from "../Typography";
import styles from "./styles";

const renderNode = (node, className, variant) =>
  node && (
    <HvTypography component="div" className={className} variant={variant}>
      {node}
    </HvTypography>
  );

/**
 * Empty states communicate that there’s no information, data or values to display in a given context.
 */
const EmptyState = (props) => {
  const { classes, className, title, message, action, icon, ...others } = props;
  return (
    <div className={clsx(className, classes.root)} {...others}>
      <div
        className={clsx(classes.container, {
          [classes.containerMessageOnly]: message && !(title || action),
        })}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.textContainer}>
          {renderNode(title, classes.titleContainer, "xxsTitle")}
          {renderNode(message, classes.messageContainer, "normalText")}
          {renderNode(action, classes.actionContainer, "normalText")}
        </div>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
    actionContainer: PropTypes.string,
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
  icon: PropTypes.element.isRequired,
};

export default withStyles(styles, { name: "HvEmptyState" })(EmptyState);
