import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { withStyles } from "@material-ui/core";
import Close from "@hv/uikit-react-icons/dist/CloseXS";
import ActionsGeneric from "../../../ActionsGeneric";
import styles from "./styles";

const ActionContainer = ({ id, classes, onClose, action, actionCallback, ...others }) => {
  return (
    <div className={classes.actionContainer}>
      <div
        className={classes.closeAction}
        role="button"
        aria-label="Close"
        onClick={onClose}
        tabIndex={0}
        onKeyDown={onClose}
        {...others}
      >
        <Close iconSize="XS" className={classes.iconContainer} color="base2" />
      </div>
      {action && (
        <div className={classes.actionsInnerContainer}>
          <ActionsGeneric
            id={id}
            category="semantic"
            actions={action}
            actionsCallback={actionCallback}
          />
        </div>
      )}
    </div>
  );
};

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
  onClose: PropTypes.func,
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

export default withStyles(styles, { name: "HvActionContainer" })(ActionContainer);
