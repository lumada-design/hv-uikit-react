import { useCallback, useMemo, useContext } from "react";
import clsx from "clsx";
import { setId, wrapperTooltip } from "utils";
import { useControlled } from "hooks";
import {
  HvVerticalNavigationTreeView,
  HvVerticalNavigationTreeViewItem,
} from "../TreeView";
import verticalNavigationTreeClasses, {
  HvVerticalNavigationTreeClasses,
} from "./navigationClasses";
import { StyledNav } from "./Navigation.styles";
import { VerticalNavigationContext } from "../VerticalNavigation";
import { HvBaseProps } from "types/generic";

export interface NavigationData {
  /**
   * the id to be applied to the root element.
   */
  id: string;
  /**
   * the label to be rendered on the menu item.
   */
  label: string;
  /**
   * The url for the link.
   */
  href?: string;
  /**
   * The behavior when opening a link.
   */
  target?: string;
  /**
   * Icon to be render.
   */
  icon?: React.ReactNode;
  /**
   * Data subset.
   */
  data?: NavigationData[];
  /**
   * if `true` the item is disabled and is not interactive.
   */
  disabled?: boolean;
  /**
   * if `true` the item doesn't have a selected state.
   */
  selectable?: boolean;
  /**
   * Any other properties.
   */
  [otherProperty: string]: any;
}

const createListHierarchy = (
  items,
  id,
  classes?: HvVerticalNavigationTreeClasses
) =>
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
      <HvVerticalNavigationTreeViewItem
        id={setId(id, itemId)}
        className={classes?.listItem}
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
      </HvVerticalNavigationTreeViewItem>
    );
  });

const getAllParents = (items) => {
  const parents = items.filter(
    (item) => item.data != null && item.data.length > 0
  );
  const childParents = parents.flatMap((item) => getAllParents(item.data));

  return [...parents, ...childParents];
};

function pathToElement(data, targetId) {
  const path: string[] = [];

  if (data != null && data.length > 0) {
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

export const HvVerticalNavigationTree = ({
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

  ...others
}: HvVerticalNavigationTreeProps) => {
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
    },
    [onChange, setSelected]
  );

  const handleToggle = useCallback(
    (event, newExpanded) => {
      setExpanded(newExpanded);

      if (onToggle) {
        onToggle(event, newExpanded);
      }
    },
    [onToggle, setExpanded]
  );

  const { isOpen, collapsedMode } = useContext(VerticalNavigationContext);

  const children = useMemo(
    () => data && createListHierarchy(data, id, classes),
    [classes, data, id]
  );

  return (
    <StyledNav
      id={id}
      className={clsx(
        className,
        verticalNavigationTreeClasses.root,
        classes?.root,
        !isOpen &&
          collapsedMode == "simple" &&
          clsx(verticalNavigationTreeClasses.collapsed, classes?.collapsed)
      )}
      {...others}
    >
      <HvVerticalNavigationTreeView
        id={setId(id, "tree")}
        className={clsx(verticalNavigationTreeClasses.list, classes?.list)}
        selectable
        mode={mode}
        collapsible={collapsible}
        selected={selected}
        onChange={handleChange}
        expanded={expanded}
        onToggle={handleToggle}
      >
        {children}
      </HvVerticalNavigationTreeView>
    </StyledNav>
  );
};

export type HvVerticalNavigationTreeProps = HvBaseProps<
  HTMLDivElement,
  { onChange }
> & {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvVerticalNavigationTreeClasses;
  /**
   * Modus operandi (role) of the widget instance.
   */
  mode?: NavigationMode;
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible?: boolean;
  /**
   * The ID of the selected page.
   */
  selected?: string;
  /**
   * When uncontrolled, defines the initial selected page ID.
   */
  defaultSelected?: string;
  /**
   * Callback fired when a navigation item is selected.
   *
   * @param {object} event The event source of the callback.
   * @param {object} page The data of the selected page.
   */
  onChange?: (event, page) => void;
  /**
   * Expanded nodes' ids.
   */
  expanded?: string[];
  /**
   * When uncontrolled, defines the initial expanded nodes' ids.
   *
   * It also supports `true` for starting with all nodes expanded.
   * With `false` all nodes will be collapsed.
   *
   * By default it expands the needed nodes to display the current selection, if any.
   */
  defaultExpanded?: string[] | boolean;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes (old and new).
   */
  onToggle?: (event, nodeIds) => void;
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * data - sub-menu items
   * href - the url used for navigation.
   * target - the behavior when opening an url.
   */
  data?: NavigationData[];
};

export type NavigationMode = "treeview" | "navigation";
