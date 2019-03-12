/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import withConfig from "../../config/withConfig";
import HvCheckBox from "../../Selectors/CheckBox";

/**
 * The footer container contains the actions of the cards also
 * it creates a checkbox if the card is required to be selectable positioning it to the left.
 *
 * @param {Object} {
 *   classes,
 *   Actions,
 *   isSelectable,
 *   onSelect,
 *   checkboxValue,
 *   checkboxSelected,
 *   checkboxIndeterminate,
 *   checkboxLabel,
 *   ...other
 * }
 */
const Footer = ({
  classes,
  Actions,
  isSelectable,
  onSelect,
  checkboxValue,
  checkboxSelected,
  checkboxIndeterminate,
  checkboxLabel,
  ...other
}) => (
  <CardActions className={classes.root} {...other}>
    {isSelectable ? (
      <>
        <div className={classes.leftContainer}>
          <HvCheckBox
            value={checkboxValue}
            onChange={onSelect}
            label={checkboxLabel}
            checked={checkboxSelected}
            indeterminate={checkboxIndeterminate}
          />
        </div>
        <div className={classes.rightContainer}>{Actions}</div>
      </>
    ) : (
      <div className={classes.leftContainer}>{Actions}</div>
    )}
  </CardActions>
);

Footer.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.instanceOf(Object),
    /**
     * Style applied to the actions left container of the component.
     */
    leftContainer: PropTypes.instanceOf(Object),
    /**
     * Style applied to the actions right container of the component. Used when selection is active.
     */
    rightContainer: PropTypes.instanceOf(Object)
  }).isRequired,
  /**
   *  The renderable content inside the Actions slot of the footer.
   */
  Actions: PropTypes.node,
  /**
   *  ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   *  The function that will be executed when the card is selected.
   */
  onSelect: PropTypes.func,
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
  checkboxIndeterminate: PropTypes.bool
};

Footer.defaultProps = {
  isSelectable: false,
  onSelect: () => {},
  checkboxValue: "",
  checkboxLabel: "",
  Actions: undefined,
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined
};

export default Footer;
