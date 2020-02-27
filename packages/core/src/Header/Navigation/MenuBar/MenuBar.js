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
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../../../useUniqueId";
import { FocusContext } from "../utils/FocusContext";
import SelectionContext from "../utils/SelectionContext";
import MenuItem from "../MenuItem";
import styles from "./styles";

const MenuBar = ({ classes, id, data, onClick, type }) => {
  const uniqueId = useUniqueId(id, "hv-menubar-");
  const selectionPath = useContext(SelectionContext);
  const { state } = useContext(FocusContext);

  const isMenu = type === "menu";
  const isActive =
    isMenu && data.filter(item => item.id === selectionPath[1]).length > 0;

  const handleMouseOver = () => {
    const { itemFocused } = state;
    if (itemFocused) itemFocused.blur();
  };

  return (
    <div
      className={clsx(classes.root, classes[`${type}`], {
        [classes.hidden]: isMenu,
        [classes.active]: isActive
      })}
    >
      <ul
        id={uniqueId}
        className={classes.list}
        onMouseOver={handleMouseOver}
        onFocus={() => {}}
      >
        {data.map(item => (
          <MenuItem key={item.id} item={item} type={type} onClick={onClick} />
        ))}
      </ul>
    </div>
  );
};

MenuBar.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    menubar: PropTypes.string,
    menu: PropTypes.string,
    hidden: PropTypes.string,
    active: PropTypes.string,
    wrapper: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  /**
   * Callback triggered when item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The type of menu.
   */
  type: PropTypes.oneOf(["menubar", "menu"]).isRequired
};

MenuBar.defaultProps = {
  id: undefined,
  data: [],
  onClick: () => {}
};

export default withStyles(styles, { name: "HvHeaderMenuBar" })(MenuBar);
