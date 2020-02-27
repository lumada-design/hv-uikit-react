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

import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../../useUniqueId";
import TreeView, { TreeViewItem } from "../TreeView";
import styles from "./styles";

const createListHierarchy = items =>
  items.map(item => {
    const { id: itemId, label: itemLabel, icon, data: children } = item;

    return (
      <TreeViewItem
        key={itemId}
        nodeId={itemId}
        label={itemLabel}
        icon={icon}
        payload={item}
      >
        {children ? createListHierarchy(children) : undefined}
      </TreeViewItem>
    );
  });

const Navigation = ({
  theme,
  classes,
  id,
  label,
  data,
  selected,
  onClick,
  ...other
}) => {
  const internalId = useUniqueId(id, "hv-verticalnavigation-navigation");

  const handleChange = useCallback(
    (event, selectedId, selectedItem) => {
      if (onClick) onClick(event, selectedItem);
    },
    [onClick]
  );

  const children = useMemo(() => data && createListHierarchy(data), [data]);

  return (
    <nav id={internalId} className={classes.root} aria-label={label} {...other}>
      <TreeView
        id={`${internalId}-tree`}
        selected={selected}
        onChange={handleChange}
        mode="navigation"
      >
        {children}
      </TreeView>
    </nav>
  );
};

Navigation.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Label.
   */
  label: PropTypes.string,
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      data: PropTypes.array
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
  theme: undefined,

  id: undefined,
  label: null,
  selected: null,
  onClick: () => {}
};

export default withStyles(styles, { name: "HvVerticalNavigationNavigation" })(
  Navigation
);
