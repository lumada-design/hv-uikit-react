import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { withStyles } from "@mui/styles";
import { Close } from "@hitachivantara/uikit-react-icons";
import ActionsGeneric from "../../../ActionsGeneric";
import HvButton from "../../../Button";
import styles from "./styles";

const ActionContainer = ({ id, classes, onClose, action, actionCallback, ...others }) => {
  return (
    <div className={classes.actionContainer}>
      <HvButton
        icon
        className={classes.closeAction}
        category="semantic"
        aria-label="Close"
        onClick={onClose}
        tabIndex={0}
        {...others}
      >
        <Close iconSize="XS" className={classes.iconContainer} color="base2" />
      </HvButton>
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
        disabled: PropTypes.bool,
      })
    ),
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionCallback: PropTypes.func,
};

export default withStyles(styles, { name: "HvActionContainer" })(ActionContainer);
