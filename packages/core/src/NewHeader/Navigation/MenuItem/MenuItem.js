/*
 * Copyright 2020 Hitachi Vantara Corporation
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

import React, { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import HvTypography from "../../../Typography";
import useUniqueId from "../../../useUniqueId";
import SelectionContext from "../utils/SelectionContext";
import { FocusContext } from "../utils/FocusContext";
import MenuBar from "../MenuBar";

import styles from "./styles";

const MenuItem = ({ classes, id, item, type, onClick }) => {
  const uniqueId = useUniqueId(id, "hv-menuItem-");
  const selectionPath = useContext(SelectionContext);
  const { dispatch } = useContext(FocusContext);

  const { data } = item;
  const isMenu = type === "menu";
  const isSelected = selectionPath[isMenu ? 1 : 0] === item.id;
  const hasSubLevel = data && data.length;

  const actionHandler = event => {
    if (
      event.type === "click" ||
      isKeypress(event, KeyboardCodes.Enter) ||
      isKeypress(event, KeyboardCodes.SpaceBar)
    ) {
      if (event.type === "click") {
        // hide focus outline when using mouse
        event.currentTarget.blur();
      }

      if (onClick) {
        onClick(event, item);
      }
    }
  };

  const handleFocus = event => {
    dispatch({ type: "setItemFocused", itemFocused: event.currentTarget });
  };

  return (
    <li
      id={uniqueId}
      key={item.label}
      role="none"
      className={classNames(
        classes.root,
        classes[`${type}Item`],
        isSelected ? classes.selectedItem : undefined
      )}
    >
      <div
        role="button"
        className={classes.button}
        onClick={actionHandler}
        onKeyDown={actionHandler}
        tabIndex={0}
        onFocus={handleFocus}
      >
        <HvTypography variant={isSelected ? "selectedNavText" : "normalText"}>
          {item.label}
        </HvTypography>
      </div>
      {hasSubLevel && <MenuBar data={data} onClick={onClick} type="menu" />}
    </li>
  );
};

MenuItem.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    menubarItem: PropTypes.string,
    selectedItem: PropTypes.string,
    menuItem: PropTypes.string,
    button: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * An object containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  /**
   * Callback triggered when item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The type of menu.
   */
  type: PropTypes.oneOf(["menubar", "menu"]).isRequired
};

MenuItem.defaultProps = {
  id: undefined,
  onClick: () => {}
};

export default withStyles(styles, { name: "HvNewHeaderMenuItem" })(MenuItem);
