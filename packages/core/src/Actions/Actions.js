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
import { withStyles } from "@material-ui/core";
import MoreVert from "@hv/uikit-react-icons/dist/Generic/MoreOptionsVertical";
import HvButton from "../Button";
import DropDownMenu from "../DropDownMenu";
import styles from "./styles";

const Actions = ({
  classes,
  id,
  category,
  actions,
  actionsCallback,
  maxVisibleActions
}) => {
  if (!Array.isArray(actions)) {
    return React.isValidElement(actions) ? actions : null;
  }

  const renderButton = (action, key = "") => (
    <HvButton
      id={key}
      key={key}
      category={category}
      className={classes.button}
      disabled={action.disabled}
      onClick={() => actionsCallback(id, action)}
      aria-label={action.ariaLabel}
      aria-labelledby={action.ariaLabelledBy}
      aria-describedby={action.ariaDescribedBy}
    >
      {action.iconCallback && action.iconCallback()}
      {action.label}
    </HvButton>
  );

  const renderActionsGrid = acts => {
    const actsVisible = acts.slice(0, maxVisibleActions);
    const actsDropdown = acts.slice(maxVisibleActions);

    return (
      <div className={classes.actionContainer}>
        {actsVisible.map((action, idx) =>
          renderButton(action, `${id}-${idx}-action-${action.id}`)
        )}
        <DropDownMenu
          classes={{ root: classes.dropDownMenu }}
          icon={<MoreVert className={classes.dropDownMenuIcon} />}
          placement="left"
          onClick={action => actionsCallback(id, action)}
          dataList={actsDropdown.map(action => ({
            ...action,
            iconCallback: action.iconCallback,
            icon: action.icon
          }))}
          keepOpened={false}
          disablePortal={false}
        />
      </div>
    );
  };

  return actions.length > maxVisibleActions
    ? renderActionsGrid(actions)
    : actions.map((action, idx) =>
        renderButton(action, `${id}-${idx}-action-${action.id}`)
      );
};

Actions.propTypes = {
  /**
   *   A Jss Object used to override or extend the styles applied to the actions.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the visible buttons.
     */
    button: PropTypes.string,
    /**
     * Styles applied to the action container wrapper.
     */
    actionContainer: PropTypes.string,
    /**
     * Styles applied to the DropDownMenu component.
     */
    dropDownMenu: PropTypes.string,
    /**
     * Styles applied to the DropDownMenu icon.
     */
    dropDownMenuIcon: PropTypes.string
  }).isRequired,
  /**
   * Component identifier.
   */
  id: PropTypes.string,
  /**
   * Button category.
   */
  category: PropTypes.oneOf([
    "primary",
    "secondary",
    "ghost",
    "ghostSecondary",
    "semantic"
  ]),
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions ´{id, label, icon, disabled}´
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
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions: PropTypes.number
};

Actions.defaultProps = {
  id: "",
  category: "ghost",
  actions: [],
  actionsCallback() {},
  maxVisibleActions: Infinity
};

export default withStyles(styles, { name: "HvActions" })(Actions);
