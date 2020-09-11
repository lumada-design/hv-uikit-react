import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import clsx from "clsx";
import { CardActions, withStyles } from "@material-ui/core";
import { HvCheckBox, setId } from "../..";
import ActionsGeneric from "../../ActionsGeneric";
import withConfig from "../../config/withConfig";
import styles from "./styles";

/**
 * The footer container contains the actions of the cards also
 * it creates a checkbox if the card is required to be selectable positioning it to the left.
 */
const Footer = props => {
  const {
    classes,
    id,
    className,
    actions,
    actionsCallback,
    actionsAlignment = "left",
    maxVisibleActions = 1,
    isSelectable = false,
    onChange,
    checked,
    checkboxProps,
    ...others
  } = props;

  return (
    <CardActions id={setId(id, "footer")} className={clsx(classes.root, className)} {...others}>
      {isSelectable && (
        <div className={classes.leftContainer}>
          <HvCheckBox onChange={onChange} checked={checked} {...checkboxProps} />
        </div>
      )}
      <div
        className={
          classes[`${isSelectable || Array.isArray(actions) ? "right" : actionsAlignment}Container`]
        }
      >
        <ActionsGeneric
          id={id}
          actions={actions}
          maxVisibleActions={maxVisibleActions}
          actionsCallback={actionsCallback}
        />
      </div>
    </CardActions>
  );
};

Footer.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the actions left container of the component.
     */
    leftContainer: PropTypes.string,
    /**
     * Style applied to the actions right container of the component. Used when selection is active.
     */
    rightContainer: PropTypes.string
  }).isRequired,
  /**
   * Component identifier.
   */
  id: PropTypes.string,
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions `{id, label, icon}`
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        iconCallback: PropTypes.func,
        disabled: PropTypes.bool,
        ariaLabel: PropTypes.string,
        ariaLabelledBy: PropTypes.string,
        ariaDescribedBy: PropTypes.string
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The alignment applied to the action elements
   */
  actionsAlignment: PropTypes.oneOf(["left", "right"]),
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
   */
  maxVisibleActions: PropTypes.number,
  /**
   *  `true` if the card should have a checkbox in the footer to be selectable `false` if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   *  The function that will be executed when the card is selected.
   */
  onChange: PropTypes.func,
  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   * note: if this value is specified the state of the checkbox must be managed
   */
  checked: PropTypes.bool,
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkboxProps: PropTypes.instanceOf(Object)
};

export default withStyles(styles, { name: "HvCardFooter" })(withConfig(Footer));
