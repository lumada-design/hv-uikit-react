import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HvButton from "../../Button";
import { setId } from "../../utils";
import styles from "./styles";

const Actions = ({ id, classes, onCancel, onApply, labels }) => (
  <div className={classes.root}>
    <HvButton id={setId(id, "apply")} className={classes.button} onClick={onApply} category="ghost">
      {labels.applyLabel}
    </HvButton>
    <HvButton
      id={setId(id, "cancel")}
      className={classes.button}
      onClick={onCancel}
      category="ghost"
    >
      {labels.cancelLabel}
    </HvButton>
  </div>
);

Actions.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * A function to be executed whenever cancel action is triggered.
   */
  onCancel: PropTypes.func,
  /**
   * A function to be executed whenever apply action is triggered.
   */
  onApply: PropTypes.func,
  /**
   * An Object containing the various text associated with the input.
   *
   * - applyLabel: Label for apply button.
   * - cancelLabel: Label for cancel button.
   */
  labels: PropTypes.shape({
    applyLabel: PropTypes.string,
    cancelLabel: PropTypes.string
  })
};

Actions.defaultProps = {
    id: undefined,
  onCancel() {},
  onApply() {},
  labels: {
    applyLabel: "Apply",
    cancelLabel: "Cancel"
  }
};

export default withStyles(styles, { name: "HvDatePickerActions" })(Actions);
