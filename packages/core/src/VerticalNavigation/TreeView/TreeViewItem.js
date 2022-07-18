import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";

import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";

import HvTypography from "../../Typography";

import { TreeViewControlContext, TreeViewStateContext } from "./TreeViewContexts";

import { setId, useForkRef } from "../../utils";

import { DescendantProvider, useDescendant } from "./descendants";

import styles from "./styles";

const preventSelection = (event, disabled) => {
  if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
    // Prevent text selection
    event.preventDefault();
  }
};

const TreeViewItem = React.forwardRef((props, ref) => {
  const {
    id: idProp,
    className,
    classes,

    disabled: disabledProp = false,

    selectable: selectableProp,

    nodeId,
    icon = null,
    label,
    href,
    target,
    payload,

    onClick,
    onMouseDown,
    onFocus,

    children,

    ...others
  } = props;

  const treeViewControlContext = useContext(TreeViewControlContext);
  const { isExpanded, isSelected, isFocused, isDisabled } = useContext(TreeViewStateContext);

  const {
    treeId,
    mode,
    collapsible,
    toggleExpansion,
    multiSelect,
    selectNode,
    selectRange,
    disabledItemsFocusable,
    registerNode,
    unregisterNode,
    mapFirstChar,
    unMapFirstChar,
    focus,
  } = treeViewControlContext;

  const treeviewMode = mode === "treeview";

  let id = null;

  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }

  const [treeitemElement, setTreeitemElement] = useState(null);
  const contentRef = useRef(null);
  const handleRef = useForkRef(setTreeitemElement, ref);

  const descendant = useMemo(
    () => ({
      element: treeitemElement,
      id: nodeId,
    }),
    [nodeId, treeitemElement]
  );

  const { index, parentId, level } = useDescendant(descendant);

  const expandable = collapsible && Array.isArray(children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;

  const selectable = selectableProp != null ? selectableProp : !collapsible || !expandable;

  useEffect(() => {
    // On the first render a node's index will be -1. We want to wait for the real index.
    if (registerNode && unregisterNode && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index,
        parentId,
        selectable,
        expandable,
        disabled: disabledProp,
        onFocus,
        payload,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [
    registerNode,
    unregisterNode,
    parentId,
    index,
    nodeId,
    expandable,
    disabledProp,
    id,
    selectable,
    onFocus,
    payload,
  ]);

  useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current?.textContent.substring(0, 1).toLowerCase());

      return () => {
        unMapFirstChar(nodeId);
      };
    }
    return undefined;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);

  let ariaSelected;
  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    /* single-selection trees unset aria-selected on un-selected items.
     *
     * If the tree does not support multiple selection, aria-selected
     * is set to true for the selected node and it is not present on any other node in the tree.
     * Source: https://www.w3.org/TR/wai-aria-practices/#TreeView
     */
    ariaSelected = true;
  }

  const handleFocus = useCallback(
    (event) => {
      // DOM focus stays on the tree which manages focus with aria-activedescendant
      if (event.target === event.currentTarget) {
        (event.target.ownerDocument || document)
          .getElementById(treeId)
          .focus({ preventScroll: true });
      }

      const unfocusable = !disabledItemsFocusable && disabled;
      if (!focused && event.currentTarget === event.target && !unfocusable) {
        focus(event, nodeId);
      }
    },
    [disabled, disabledItemsFocusable, focus, focused, nodeId, treeId]
  );

  const handleExpansion = useCallback(
    (event) => {
      if (!disabled) {
        if (treeviewMode && !focused) {
          focus(event, nodeId);
        }

        const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

        // If already expanded and trying to toggle selection don't close
        if (expandable && !(multiple && isExpanded(nodeId))) {
          toggleExpansion(event, nodeId);
        }
      }
    },
    [
      disabled,
      expandable,
      focus,
      focused,
      isExpanded,
      multiSelect,
      nodeId,
      toggleExpansion,
      treeviewMode,
    ]
  );

  const handleSelection = useCallback(
    (event) => {
      if (selectable && !disabled) {
        if (treeviewMode && !focused) {
          focus(event, nodeId);
        }

        const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

        if (multiple) {
          if (event.shiftKey) {
            selectRange(event, { end: nodeId });
          } else {
            selectNode(event, nodeId, true);
          }
        } else {
          selectNode(event, nodeId);
        }
      }
    },
    [
      disabled,
      focus,
      focused,
      multiSelect,
      nodeId,
      selectNode,
      selectRange,
      selectable,
      treeviewMode,
    ]
  );

  const handleMouseDown = useCallback(
    (event) => {
      preventSelection(event, disabled);

      if (onMouseDown) {
        onMouseDown(event);
      }
    },
    [disabled, onMouseDown]
  );

  const handleClick = useCallback(
    (event) => {
      if (!disabled) {
        if (expandable) {
          handleExpansion(event);
        }

        if (selectable) {
          handleSelection(event);
        }
      }

      if (onClick) {
        onClick(event);
      }
    },
    [disabled, expandable, handleExpansion, handleSelection, onClick, selectable]
  );

  const handleKeyDown = useCallback(
    (event) => {
      let isEventHandled = false;
      const { key } = event;

      if (event.altKey || event.ctrlKey || event.metaKey || event.currentTarget !== event.target) {
        return;
      }
      if (contentRef.current === event.currentTarget) {
        if (key === "Enter" || key === " ") {
          if (expandable) {
            isEventHandled = handleExpansion(event);
          }

          if (selectable) {
            isEventHandled = handleSelection(event);
          }
        }

        if (isEventHandled) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    },
    [expandable, handleExpansion, handleSelection, selectable]
  );

  const renderedContent = useMemo(
    () => (
      <HvTypography
        id={setId(id, "button")}
        component={href ? "a" : "div"}
        href={href}
        target={target}
        innerRef={contentRef}
        className={clsx(classes.content, { [classes.link]: href != null })}
        variant={disabled ? "placeholderText" : "normalText"}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        style={{
          paddingLeft: (expandable || icon != null ? 0 : 10) + level * (collapsible ? 32 : 10),
        }}
        {...(treeviewMode
          ? {
              role: "button",
              tabIndex: -1,
              onFocus: handleFocus,
            }
          : {
              role: "button",
              tabIndex: selectable || expandable ? 0 : -1,
              onKeyDown: handleKeyDown,
              "aria-current": selectable && selected ? "page" : undefined,
              "aria-expanded": expandable ? expanded : undefined,
              "aria-controls": expandable ? setId(id, "group") : undefined,
            })}
      >
        {expandable && (expanded ? <DropUpXS /> : <DropDownXS />)}
        {icon}
        {label}
      </HvTypography>
    ),
    [
      id,
      href,
      target,
      classes.content,
      classes.link,
      disabled,
      handleClick,
      handleMouseDown,
      expandable,
      icon,
      level,
      collapsible,
      treeviewMode,
      handleFocus,
      selectable,
      handleKeyDown,
      selected,
      expanded,
      label,
    ]
  );

  const renderedChildren = useMemo(
    () =>
      children && (
        <ul
          id={setId(id, "group")}
          className={classes.group}
          role={treeviewMode ? "group" : undefined}
        >
          {children}
        </ul>
      ),
    [children, classes.group, id, treeviewMode]
  );

  return (
    <li
      ref={handleRef}
      id={id}
      className={clsx(classes.node, className, {
        [classes.disabled]: disabled,
        [classes.expandable]: expandable,
        [classes.collapsed]: expandable && !expanded,
        [classes.expanded]: expandable && expanded,
        [classes.selectable]: !disabled && selectable,
        [classes.unselectable]: !disabled && !selectable,
        [classes.selected]: !disabled && selectable && selected,
        [classes.unselected]: !disabled && selectable && !selected,
        [classes.focused]: focused,
      })}
      data-hasicon={icon != null ? true : undefined}
      {...(mode === "treeview" && {
        role: "treeitem",
        "aria-selected": ariaSelected,
        "aria-expanded": expandable ? expanded : undefined,
        "aria-disabled": disabled ? true : undefined,
      })}
      {...others}
    >
      {renderedContent}
      <DescendantProvider id={nodeId} level={level + 1}>
        {renderedChildren}
      </DescendantProvider>
    </li>
  );
});

TreeViewItem.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the Radio button.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    node: PropTypes.string,
    /**
     * Style applied to the content.
     */
    content: PropTypes.string,
    /**
     * Style applied to the content when it is a link.
     */
    link: PropTypes.string,
    /**
     * Style applied to the group.
     */
    group: PropTypes.string,
    /**
     * Style applied when item is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Style applied when item is expandable.
     */
    expandable: PropTypes.string,
    /**
     * Style applied when item is collapsed.
     */
    collapsed: PropTypes.string,
    /**
     * Style applied when item is expanded.
     */
    expanded: PropTypes.string,
    /**
     * Style applied when item is selectable.
     */
    selectable: PropTypes.string,
    /**
     * Style applied when item is unselectable.
     */
    unselectable: PropTypes.string,
    /**
     * Style applied when item is selected.
     */
    selected: PropTypes.string,
    /**
     * Style applied when item is unselectable.
     */
    unselected: PropTypes.string,
    /**
     * Style applied when item is focused.
     */
    focused: PropTypes.string,
  }).isRequired,
  /**
   * Is the node disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Can the node be selected.
   */
  selectable: PropTypes.bool,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
  /**
   * The icon to display next to the node's label.
   */
  icon: PropTypes.node,
  /**
   * The item label.
   */
  label: PropTypes.node.isRequired,
  /**
   * The url for the link.
   */
  href: PropTypes.string,
  /**
   * The behavior when opening a link.
   */
  target: PropTypes.string,
  /**
   * The node payload.
   */
  // eslint-disable-next-line react/forbid-prop-types
  payload: PropTypes.any,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export default withStyles(styles, {
  name: "HvVerticalNavigationTreeViewItem",
})(TreeViewItem);
