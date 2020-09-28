import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HvButton from "../../Button";
import { setId } from "../../utils";
import styles from "./styles";

const Actions = ({ id, classes, onCancel, onApply, cancelLabel, applyLabel }) => (
  <div id={id} className={classes.root}>
    <HvButton id={setId(id, "apply")} className={classes.button} onClick={onApply} category="ghost">
      {applyLabel}
    </HvButton>
    <HvButton
      id={setId(id, "cancel")}
      className={classes.button}
      onClick={onCancel}
      category="ghost"
    >
      {cancelLabel}
    </HvButton>
  </div>
);

Actions.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string.isRequired,
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
   * Label for cancel button
   */
  cancelLabel: PropTypes.string,
  /**
   * Label for apply button
   */
  applyLabel: PropTypes.string,
};

Actions.defaultProps = {
  onCancel() {},
  onApply() {},
  cancelLabel: "Cancel",
  applyLabel: "Apply",
};

export default withStyles(styles, { name: "HvDropdownActions" })(Actions);
