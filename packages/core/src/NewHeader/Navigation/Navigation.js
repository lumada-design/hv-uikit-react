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

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import useUniqueId from "../../useUniqueId";
import { FocusProvider } from "./utils/FocusContext";
import SelectionContext from "./utils/SelectionContext";
import useSelectionPath from "./utils/useSelectionPath";
import MenuBar from "./MenuBar";

import styles from "./styles";

const Navigation = ({ classes, id, data, selected, onClick }) => {
  const uniqueId = useUniqueId(id, "hv-navigation-");
  const selectionPath = useSelectionPath(data, selected);

  const handleClick = (e, selectedItem) => {
    if (onClick) {
      onClick(e, selectedItem);
    }
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <FocusProvider>
        <nav id={uniqueId} className={classes.root}>
          <MenuBar data={data} onClick={handleClick} type="menubar" />
        </nav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};

Navigation.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
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
  ).isRequired,
  /**
   * Menu item id selected.
   */
  selected: PropTypes.string,
  /**
   * Callback triggered when any item is clicked.
   */
  onClick: PropTypes.func
};

Navigation.defaultProps = {
  id: undefined,
  selected: null,
  onClick: () => {}
};

export default withStyles(styles, { name: "HvNewHeaderNavigation" })(
  Navigation
);
