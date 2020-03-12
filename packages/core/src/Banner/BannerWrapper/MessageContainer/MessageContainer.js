import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { withStyles } from "@material-ui/core";
import HvTypography from "../../../Typography";
import Actions from "../../../Actions";
import styles from "./styles";

/**
 * Container for the message of the banner. This message may include:
 * - Icon (variant or custom)
 * - Text
 * - Actions
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const MessageContainer = ({
  id,
  classes,
  icon,
  actionsOnMessage,
  actionsOnMessageCallback,
  message
}) => (
  <>
    {icon && <div className={classes.iconContainer}>{icon}</div>}
    <HvTypography
      variant="normalText"
      {...(id && { id: `${id}-message-text` })}
      className={classes.message}
    >
      {message}
    </HvTypography>
    {actionsOnMessage && (
      <div {...(id && { id: `${id}-message-actions` })} className={classes.actionMessageContainer}>
        <Actions actions={actionsOnMessage} actionsCallback={actionsOnMessageCallback} />
      </div>
    )}
  </>
);

MessageContainer.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * Icon to be presented.
   */
  icon: PropTypes.node,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * Actions to display on message.
   */
  actionsOnMessage: oneOfType([
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
   * The callback function ran when an action is triggered, receiving ´actionsOnMessage´ as param
   */
  actionsOnMessageCallback: PropTypes.func
};

MessageContainer.defaultProps = {
  id: null,
  classes: null,
  icon: null,
  message: "",
  actionsOnMessage: undefined,
  actionsOnMessageCallback: () => {}
};

export default withStyles(styles, { name: "HvMessageContainer" })(MessageContainer);
