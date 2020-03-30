import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import TreeView, { TreeViewItem } from "../TreeView";
import { setId } from "../../utils";
import styles from "./styles";

const createListHierarchy = (items, id) =>
  items.map(item => {
    const { id: itemId, label: itemLabel, icon, data: children } = item;

    return (
      <TreeViewItem
        id={setId(id, itemId)}
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
  className,
  classes,
  id,
  label = null,
  data,
  selected = null,
  onClick = null,
  ...others
}) => {
  const handleChange = useCallback(
    (event, selectedId, selectedItem) => {
      if (onClick) onClick(event, selectedItem);
    },
    [onClick]
  );

  const children = useMemo(() => data && createListHierarchy(data, id), [data, id]);

  return (
    <nav id={id} className={clsx(className, classes.root)} aria-label={label} {...others}>
      <TreeView
        id={setId(id, "tree")}
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
   * Class names to be applied.
   */
  className: PropTypes.string,
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

export default withStyles(styles, { name: "HvVerticalNavigationNavigation" })(Navigation);
