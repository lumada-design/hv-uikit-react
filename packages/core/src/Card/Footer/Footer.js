/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Cardactions from "@material-ui/core/CardActions";
import MoreVert from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";
import withStyles from "@material-ui/core/styles/withStyles";
import HvCheckBox from "../../Selectors/CheckBox";
import HvButton from "../../Button";
import DropDownMenu from "../../DropDownMenu";
import stylesDropdownMenu from "./stylesDropdownMenu";

const DropDown = withStyles(stylesDropdownMenu, { withTheme: true })(
  DropDownMenu
);

const renderActions = (
  actions,
  id,
  actionsCallback,
  classes,
  maxVisibleActions
) => {
  if (!Array.isArray(actions)) {
    return React.isValidElement(actions) ? actions : null;
  }

  const renderButton = action => (
    <HvButton
      disabled={action.disabled}
      onClick={() => actionsCallback(id, action)}
      category="ghostSecondary"
    >
      {action.icon && action.icon({ classes })}
      {action.label}
    </HvButton>
  );

  const renderActionsGrid = acts => (
    <Grid container>
      <Grid item xs={8} className={classes.item}>
        {renderButton(acts[0])}
      </Grid>
      <Grid item xs={4} className={classes.item}>
        <DropDown
          icon={<MoreVert />}
          placement="left"
          onClick={action => actionsCallback(id, action)}
          dataList={acts.slice(1).map(a => ({ ...a, leftIcon: a.icon }))}
        />
      </Grid>
    </Grid>
  );

  return actions.length > maxVisibleActions
    ? renderActionsGrid(actions, id)
    : actions.map(a => renderButton(a));
};

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
  ...other
}) => (
  <Cardactions className={classNames(classes.root, className)} {...other}>
    {isSelectable && (
      <div className={classes.leftContainer}>
        <HvCheckBox
          value={checkboxValue || id}
          onChange={onChange}
          label={checkboxLabel}
          checked={checkboxSelected}
          indeterminate={checkboxIndeterminate}
        />
      </div>
    )}
    <div
      className={
        classes[
          `${
            isSelectable || Array.isArray(actions) ? "right" : actionsAlignment
          }Container`
        ]
      }
    >
      {renderActions(
        actions,
        checkboxValue || id,
        actionsCallback,
        classes,
        maxVisibleActions
      )}
    </div>
  </Cardactions>
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
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions ´{id, label, icon}´
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func
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
  checkboxIndeterminate: PropTypes.bool
};

Footer.defaultProps = {
  className: "",
  id: "",
  isSelectable: false,
  onChange: () => {},
  checkboxValue: "",
  checkboxLabel: "",
  actions: undefined,
  actionsCallback: () => {},
  actionsAlignment: "left",
  maxVisibleActions: 2,
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined
};

export default Footer;
