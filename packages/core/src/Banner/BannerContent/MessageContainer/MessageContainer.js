import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { withStyles } from "@material-ui/core";
import HvTypography from "../../../Typography";
import ActionsGeneric from "../../../ActionsGeneric";
import { setId } from "../../../utils";
import styles from "./styles";

const MessageContainer = ({
  id,
  classes,
  icon,
  actionsOnMessage,
  actionsOnMessageCallback,
  message,
}) => (
  <>
    {icon && <div className={classes.iconContainer}>{icon}</div>}
    <HvTypography id={setId(id, "message-text")} className={classes.message}>
      {message}
    </HvTypography>
    {actionsOnMessage && (
      <div id={setId(id, "message-actions")} className={classes.actionMessageContainer}>
        <ActionsGeneric
          id={id}
          category="semantic"
          actions={actionsOnMessage}
          actionsCallback={actionsOnMessageCallback}
        />
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
        disabled: PropTypes.bool,
      })
    ),
  ]),
  /**
   * The callback function ran when an action is triggered, receiving `actionsOnMessage` as param
   */
  actionsOnMessageCallback: PropTypes.func,
};

export default withStyles(styles, { name: "HvMessageContainer" })(MessageContainer);
