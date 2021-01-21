/* eslint-disable jsx-a11y/role-supports-aria-props */
// TODO review aria-disabled and aria-expanded added conditionally to a no tree item li

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HvTypography from "../../Typography";

import { TreeViewControlContext, TreeViewStateContext } from "./TreeViewContexts";

import { setId } from "../../utils";
import arrayDiff from "../../utils/arrayDiff";
import usePropAsRef from "../../utils/usePropAsRef";

import styles from "./styles";

const isPrintableCharacter = (str) => str && str.length === 1 && str.match(/\S/);

const TreeViewItem = (props) => {
  const {
    id,
    className,
    classes,

    disabled = false,

    selectable: selectableProp = null,

    nodeId,
    icon = null,
    label,
    payload = null,

    onClick = null,

    children,

    ...others
  } = props;

  const treeViewControlContext = useContext(TreeViewControlContext);
  const treeViewStateContext = useContext(TreeViewStateContext);

  const {
    expandAllSiblings,
    focus,
    focusFirstNode,
    focusLastNode,
    focusNextNode,
    focusPreviousNode,
    handleLeftArrow,
    addNodeToNodeMap,
    removeNodeFromNodeMap,
    collapsible,
    select,
    setFocusByFirstCharacter,
    toggle,
    mode,
  } = treeViewControlContext;

  const treeviewMode = mode === "treeview";

  const listItemRef = useRef(null);
  const actionableRef = useRef(null);
  const [useFocus, setUseFocus] = useState(false);

  const expandable = Boolean(Array.isArray(children) ? children.length : children);

  const selectable = selectableProp != null ? selectableProp : !(collapsible && expandable);

  const expanded = treeViewStateContext.isExpanded(nodeId);
  const selected = treeViewStateContext.isSelected(nodeId);

  const tabbable = treeViewStateContext.isTabbable(nodeId);

  const handleAction = useCallback(
    (event) => {
      if (!disabled) {
        if (collapsible && expandable) {
          if (!selectable || !expanded || selected) {
            return toggle(nodeId);
          }
        }

        if (selectable && !selected) {
          return select(event, nodeId);
        }
      }

      return false;
    },
    [collapsible, disabled, expandable, expanded, nodeId, select, selectable, selected, toggle]
  );

  const onChangeCallback = usePropAsRef(onClick);

  const handleClick = useCallback(
    (event) => {
      setUseFocus(false);
      if (!tabbable) {
        focus(nodeId);
      }

      handleAction(event);

      // allow custom click event
      if (!disabled && onChangeCallback.current) {
        onChangeCallback.current(event);
      }

      event.preventDefault();
      event.stopPropagation();
    },
    [disabled, focus, tabbable, handleAction, nodeId, onChangeCallback]
  );

  const handleNextArrow = useCallback(
    (event) => {
      if (expandable) {
        if (expanded) {
          return focusNextNode(event, nodeId);
        }
        if (!disabled) {
          return toggle(event, nodeId);
        }
      }

      return false;
    },
    [disabled, expandable, expanded, focusNextNode, nodeId, toggle]
  );

  const handleKeyDown = useCallback(
    (event) => {
      let isEventHandled = false;
      const { key } = event;

      if (event.altKey || event.ctrlKey || event.metaKey || event.currentTarget !== event.target) {
        return;
      }

      if (!treeviewMode) {
        if (key === "Enter" || key === " ") {
          if (actionableRef.current === event.currentTarget) {
            isEventHandled = handleAction(event);
          }
        }
      } else {
        switch (key) {
          case "Enter":
          case " ":
            if (event.shift) {
              isEventHandled = true;
            } else if (actionableRef.current === event.currentTarget) {
              isEventHandled = handleAction(event);
            }
            break;
          case "ArrowDown":
            isEventHandled = focusNextNode(nodeId);
            break;
          case "ArrowUp":
            isEventHandled = focusPreviousNode(nodeId);
            break;
          case "ArrowRight":
            isEventHandled = handleNextArrow(nodeId);
            break;
          case "ArrowLeft":
            isEventHandled = handleLeftArrow(nodeId, event);
            break;
          case "Home":
            isEventHandled = focusFirstNode();
            break;
          case "End":
            isEventHandled = focusLastNode();
            break;
          case "*":
            isEventHandled = expandAllSiblings(nodeId);
            break;
          default:
            if (isPrintableCharacter(key)) {
              isEventHandled = setFocusByFirstCharacter(nodeId, key);
            }
        }
      }

      if (isEventHandled) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [
      treeviewMode,
      handleAction,
      focusNextNode,
      nodeId,
      focusPreviousNode,
      handleNextArrow,
      handleLeftArrow,
      focusFirstNode,
      focusLastNode,
      expandAllSiblings,
      setFocusByFirstCharacter,
    ]
  );

  const previousChildIds = useRef([]);
  const childIds = useMemo(() => {
    const ids = React.Children.map(children, (child) => child.props.nodeId) || [];

    if (arrayDiff(previousChildIds.current, ids)) {
      previousChildIds.current = ids;
    }

    return previousChildIds.current;
  }, [children]);

  // payload prop was causing unneeded context changes
  // we just need to keep it as a mutable reference
  const nodePayloadRef = usePropAsRef(payload);

  // register node in the tree (and unregister on unmount)
  useEffect(() => {
    addNodeToNodeMap(nodeId, childIds, nodePayloadRef, actionableRef, label);

    return () => {
      removeNodeFromNodeMap(nodeId);
    };
  }, [addNodeToNodeMap, childIds, label, nodeId, nodePayloadRef, removeNodeFromNodeMap]);

  // focus the rendered DOM element (if tabbable)
  useEffect(() => {
    if (treeviewMode && tabbable && actionableRef.current) {
      actionableRef.current.focus();
    }
  }, [treeviewMode, tabbable]);

  const renderedIcon = useMemo(
    () =>
      icon &&
      React.cloneElement(icon, {
        boxStyles: { width: "32px", height: "32px" },
      }),
    [icon]
  );

  const renderedContent = useMemo(
    () => (
      <HvTypography
        id={setId(id, "button")}
        component="div"
        variant={selectable && selected ? "selectedText" : "normalText"}
        role="button"
        innerRef={actionableRef}
        className={clsx(classes.content, {
          [classes.contentFocused]: useFocus,
          [classes.contentFocusDisabled]: !useFocus,
        })}
        tabIndex={tabbable ? 0 : -1}
        onKeyDown={handleKeyDown}
        onFocus={() => setUseFocus(true)}
        onBlur={() => setUseFocus(false)}
        onClick={handleClick}
        aria-current={!treeviewMode && selectable && selected ? "page" : undefined}
      >
        {renderedIcon}
        {label}
      </HvTypography>
    ),
    [
      classes,
      handleClick,
      handleKeyDown,
      useFocus,
      id,
      label,
      treeviewMode,
      renderedIcon,
      selectable,
      selected,
      tabbable,
    ]
  );

  const renderedChildren = useMemo(
    () =>
      children && (
        <ul className={classes.group} role={treeviewMode ? "group" : undefined}>
          {children}
        </ul>
      ),
    [children, classes.group, treeviewMode]
  );

  return (
    <li
      ref={listItemRef}
      id={id}
      className={clsx(classes.node, className, {
        [classes.disabled]: disabled,
        [classes.collapsed]: expandable && !expanded,
        [classes.expanded]: expandable && expanded,
        [classes.selectable]: !disabled && selectable,
        [classes.unselectable]: !disabled && !selectable,
        [classes.selected]: !disabled && selectable && selected,
        [classes.unselected]: !disabled && selectable && !selected,
      })}
      data-hasicon={icon != null ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      aria-expanded={collapsible && expandable ? expanded : undefined}
      {...(mode === "treeview" && {
        role: "treeitem",
        "aria-selected": selectable && selected ? true : undefined,
      })}
      {...others}
    >
      {renderedContent}
      {renderedChildren}
    </li>
  );
};

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
     * Style applied to the group.
     */
    group: PropTypes.string,
    /**
     * Style applied when item is disabled.
     */
    disabled: PropTypes.string,
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
     * Style applied when element is focused by keyboard.
     */
    contentFocused: PropTypes.string,
    /**
     * Style applied when element is focused by click.
     */
    contentFocusDisabled: PropTypes.string,
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
   * The node payload.
   */
  // eslint-disable-next-line react/forbid-prop-types
  payload: PropTypes.any,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export default withStyles(styles, {
  name: "HvVerticalNavigationTreeViewItem",
})(TreeViewItem);
