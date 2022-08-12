import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { deprecatedPropType } from "@mui/material";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import { TreeView, TreeViewItem } from "../TreeView";
import { setId, useControlled } from "../../utils";
import styles from "./styles";
import { wrapperTooltip } from "../../List/utils";

const createListHierarchy = (items, id, classes) =>
  items.map((item) => {
    const {
      id: itemId,
      label: itemLabel,
      icon,
      data: children,
      selectable,
      disabled,
      href,
      target,
    } = item;

    const ItemText = wrapperTooltip(true, itemLabel, itemLabel);

    return (
      <TreeViewItem
        id={setId(id, itemId)}
        className={classes.listItem}
        href={href}
        target={target}
        key={itemId}
        nodeId={itemId}
        label={<ItemText />}
        icon={icon}
        payload={item}
        selectable={selectable}
        disabled={disabled}
      >
        {children ? createListHierarchy(children, id, classes) : undefined}
      </TreeViewItem>
    );
  });

const getAllParents = (items) => {
  const parents = items.filter((item) => item.data != null && item.data.length > 0);
  const childParents = parents.flatMap((item) => getAllParents(item.data));

  return [...parents, ...childParents];
};

function pathToElement(data, targetId) {
  const path = [];

  if (data != null && data.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i !== data.length; ++i) {
      const item = data[i];
      if (item.id === targetId) {
        path.push(item.id);
        break;
      }

      const subPaths = pathToElement(item.data, targetId);
      if (subPaths.length > 0) {
        path.push(item.id);
        path.push(...subPaths);
        break;
      }
    }
  }

  return path;
}

const Navigation = ({
  id,

  className,
  classes,

  data,

  mode = "navigation",

  collapsible = false,
  expanded: expandedProp,
  defaultExpanded,
  onToggle,

  selected: selectedProp,
  defaultSelected,
  onChange,

  label,
  onClick,

  ...others
}) => {
  const [selected, setSelected] = useControlled(selectedProp, defaultSelected);
  const [expanded, setExpanded] = useControlled(expandedProp, () => {
    if (defaultExpanded === true) {
      // all parent nodes will be expanded by default
      return getAllParents(data).map((item) => item.id);
    }

    if (defaultExpanded === false) {
      // all parent nodes will be collapsed by default
      return [];
    }

    if (defaultExpanded == null) {
      if (selected != null) {
        // the path to the selected node will be expanded (default behaviour)
        const path = pathToElement(data, selected);
        return path.slice(0, -1);
      }

      // nothing is expanded
      return [];
    }

    return defaultExpanded;
  });

  const handleChange = useCallback(
    (event, selectedId, selectedItem) => {
      setSelected(selectedId);

      if (onChange) {
        onChange(event, selectedItem);
      }

      // deprecated
      if (onClick) {
        onClick(event, selectedItem);
      }
    },
    [onChange, onClick, setSelected]
  );

  const handleToggle = useCallback(
    (event, newExpanded) => {
      setExpanded(newExpanded);

      if (onToggle) {
        onToggle(event, newExpanded);
      }

      // deprecated
      if (onClick) {
        onClick(event);
      }
    },
    [onClick, onToggle, setExpanded]
  );

  const children = useMemo(
    () => data && createListHierarchy(data, id, classes),
    [classes, data, id]
  );

  return (
    <nav id={id} className={clsx(className, classes.root)} aria-label={label} {...others}>
      <TreeView
        id={setId(id, "tree")}
        className={classes.list}
        selectable
        mode={mode}
        collapsible={collapsible}
        selected={selected}
        onChange={handleChange}
        expanded={expanded}
        onToggle={handleToggle}
      >
        {children}
      </TreeView>
    </nav>
  );
};

Navigation.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,

  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Style applied to the list.
     */
    list: PropTypes.string,
    /**
     * Style applied to the list items.
     */
    listItem: PropTypes.string,
  }).isRequired,

  /**
   * Modus operandi (role) of the widget instance.
   */
  mode: PropTypes.oneOf(["treeview", "navigation"]),
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible: PropTypes.bool,

  /**
   * The ID of the selected page.
   */
  selected: PropTypes.string,
  /**
   * When uncontrolled, defines the initial selected page ID.
   */
  defaultSelected: PropTypes.string,
  /**
   * Callback fired when a navigation item is selected.
   *
   * @param {object} event The event source of the callback.
   * @param {object} page The data of the selected page.
   */
  onChange: PropTypes.func,

  /**
   * Expanded nodes' ids.
   */
  expanded: PropTypes.arrayOf(PropTypes.string),
  /**
   * When uncontrolled, defines the initial expanded nodes' ids.
   *
   * It also supports `true` for starting with all nodes expanded.
   * With `false` all nodes will be collapsed.
   *
   * By default it expands the needed nodes to display the current selection, if any.
   */
  defaultExpanded: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes (old and new).
   */
  onToggle: PropTypes.func,

  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * data - sub-menu items
   * href - the url used for navigation.
   * target - the behavior when opening an url.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      data: PropTypes.array,
      href: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,

  /**
   * Callback triggered when any item is clicked.
   *
   *  @deprecated use `onChange` for selection and `onToggle` for node expansion/collapse.
   */
  onClick: deprecatedPropType(PropTypes.func),
  /**
   * The root element (nav) aria label.
   *
   *  @deprecated Use directly the `aria-label` property instead.
   */
  label: deprecatedPropType(PropTypes.string),
};

export default withStyles(styles, { name: "HvVerticalNavigationNavigation" })(Navigation);
