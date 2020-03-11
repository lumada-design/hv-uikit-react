import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import clsx from "clsx";
import { CardActions, withStyles } from "@material-ui/core";
import HvCheckBox from "../../Selectors/CheckBox";
import Actions from "../../Actions";
import withConfig from "../../config/withConfig";
import styles from "./styles";

/**
 * The footer container contains the actions of the cards also
 * it creates a checkbox if the card is required to be selectable positioning it to the left.
 *
 * @param {Object} {
 *   classes,
 *   actions,
 *   isSelectable,
 *   onChange,
 *   checkboxValue,
 *   checkboxSelected,
 *   checkboxIndeterminate,
 *   checkboxLabel,
 *   ...other
 * }
 */
const Footer = ({
  classes,
  id,
  checkboxAriaLabel,
  checkboxAriaLabelledBy,
  checkboxAriaDescribedBy,
  className,
  actions,
  actionsCallback,
  actionsAlignment,
  maxVisibleActions,
  isSelectable,
  onChange,
  checkboxValue,
  checkboxSelected,
  checkboxIndeterminate,
  checkboxLabel,
  actionItemWidth,
  ...other
}) => (
  <CardActions className={clsx(classes.root, className)} {...other}>
    {isSelectable && (
      <div className={classes.leftContainer}>
        <HvCheckBox
          value={checkboxValue || id}
          onChange={onChange}
          label={checkboxLabel}
          checked={checkboxSelected}
          indeterminate={checkboxIndeterminate}
          checkboxProps={{
            "aria-label": checkboxAriaLabel,
            "aria-labelledby": checkboxAriaLabelledBy,
            "aria-describedby": checkboxAriaDescribedBy
          }}
          inputProps={{
            "aria-label": "card-checkbox-input"
          }}
        />
      </div>
    )}
    <div
      className={
        classes[`${isSelectable || Array.isArray(actions) ? "right" : actionsAlignment}Container`]
      }
    >
      <Actions
        id={checkboxValue || id}
        actions={actions}
        maxVisibleActions={maxVisibleActions}
        actionItemWidth={actionItemWidth}
        actionsCallback={actionsCallback}
      />
    </div>
  </CardActions>
);

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
   *  Used to define a string that labels the checkbox element.
   */
  checkboxAriaLabel: PropTypes.string,
  /**
   *  Establishes relationships between the checkbox and their label(s), and its value should be one or more element IDs.
   */
  checkboxAriaLabelledBy: PropTypes.string,
  /**
   *  Used to indicate the IDs of the elements that describe the checkbox.
   */
  checkboxAriaDescribedBy: PropTypes.string,
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions ´{id, label, icon}´
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
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The alignment applied to the action elements
   */
  actionsAlignment: PropTypes.oneOf(["left", "right"]),
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions: PropTypes.number,
  /**
   *  ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   *  The function that will be executed when the card is selected.
   */
  onChange: PropTypes.func,
  /**
   *  The value the checkbox in the footer will return when selected.
   */
  checkboxValue: PropTypes.string,
  /**
   *  The label for the checkbox in the footer of the card.
   */
  checkboxLabel: PropTypes.string,
  /**
   *  ´true´ if the checkbox is selected or ´false´ if not selected.
   *
   *  Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checkboxSelected: PropTypes.bool,
  /**
   *  ´true´ if the checkbox should use the intermediate state when selected ´false´ if not.
   */
  checkboxIndeterminate: PropTypes.bool,
  /**
   *  Width applicable to the action container, to handle an issue Safari has when using css flex:
   *  It resizes descendant divs, unless a width is forced
   */
  actionItemWidth: PropTypes.number
};

Footer.defaultProps = {
  className: "",
  id: "",
  checkboxAriaLabel: undefined,
  checkboxAriaLabelledBy: undefined,
  checkboxAriaDescribedBy: undefined,
  isSelectable: false,
  onChange: () => {},
  checkboxValue: "",
  checkboxLabel: "",
  actions: undefined,
  actionsCallback: () => {},
  actionsAlignment: "left",
  maxVisibleActions: 1,
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined,
  actionItemWidth: undefined
};

export default withStyles(styles, { name: "HvCardFooter" })(withConfig(Footer));
