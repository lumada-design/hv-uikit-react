import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { withStyles } from "@material-ui/core";
import Close from "@hv/uikit-react-icons/dist/Generic/CloseXS";
import Actions from "../../../Actions";
import styles from "./styles";

/**
 * Container for the actions. This actions include:
 * - X button for close
 * - The passed actions
 * *
 * @param props
 * @returns {*}
 * @constructor
 */
const ActionContainer = ({ id, classes, onClose, action, actionCallback }) => (
  <div className={classes.actionContainer}>
    <div
      className={classes.closeAction}
      role="button"
      onClick={onClose}
      tabIndex={0}
      onKeyDown={onClose}
    >
      <Close iconSize="XS" className={classes.iconContainer} color="base2" />
    </div>
    {action && (
      <div className={classes.actionsInnerContainer}>
        <Actions
          id={id}
          category="semantic"
          actions={action}
          actionsCallback={actionCallback}
        />
      </div>
    )}
  </div>
);

ActionContainer.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * onClose function.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Actions to display.
   */
  action: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func,
        disabled: PropTypes.bool
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionCallback: PropTypes.func
};

ActionContainer.defaultProps = {
  id: null,
  classes: null,
  action: undefined,
  actionCallback: () => {}
};

export default withStyles(styles, { name: "HvActionContainer" })(
  ActionContainer
);
