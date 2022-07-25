import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import { TreeViewControlContext, TreeViewStateContext } from "./TreeViewContexts";

import arrayDiff from "../../utils/arrayDiff";
import usePropAsRef from "../../utils/usePropAsRef";
import { NodeTreeExpandUtils, NodeTreeMapUtils, NodeTreeNavigationUtils } from "./utils";

import styles from "./styles";

const TreeView = (props) => {
  const {
    id,
    className,
    classes,
    mode = "treeview",
    collapsible = false,
    selectable = true,
    selected = null,
    onChange = null,
    children = null,
    ...others
  } = props;

  const [tabable, setTabable] = useState(null);

  const [expanded, setExpandedState] = useState([]);

  const firstNode = useRef(null);
  const nodeMap = useRef({});

  const treeviewMode = mode === "treeview";

  const isExpanded = useCallback(
    (nodeId) => !collapsible || NodeTreeExpandUtils.isExpanded(expanded, nodeId),
    [collapsible, expanded]
  );
  const isTabbable = useCallback(
    (nodeId) => !treeviewMode || tabable === nodeId,
    [treeviewMode, tabable]
  );
  const isSelected = useCallback(
    (nodeId) => selectable && selected != null && selected === nodeId,
    [selectable, selected]
  );

  // onChange prop was causing unneeded context changes
  // we just need to keep it as a mutable reference
  const onChangeCallback = usePropAsRef(onChange);

  const select = useCallback(
    (event, selectedNodeId) => {
      if (onChangeCallback.current) {
        onChangeCallback.current(
          event,
          selectedNodeId,
          nodeMap.current[selectedNodeId] != null
            ? nodeMap.current[selectedNodeId].nodePayloadRef.current
            : null
        );
      }
    },
    [onChangeCallback]
  );

  const getNextNode = useCallback(
    (nodeId) => NodeTreeNavigationUtils.getNextNode(isExpanded, nodeMap.current, nodeId),
    [isExpanded]
  );
  const getPreviousNode = useCallback(
    (nodeId) => NodeTreeNavigationUtils.getPreviousNode(isExpanded, nodeMap.current, nodeId),
    [isExpanded]
  );
  const getFirstNode = useCallback(() => {
    if (firstNode.current) {
      return firstNode.current;
    }

    return null;
  }, []);
  const getLastNode = useCallback(
    (nodeId = -1) => NodeTreeNavigationUtils.getLastNode(isExpanded, nodeMap.current, nodeId),
    [isExpanded]
  );

  const focus = useCallback(
    (nodeId) => {
      if (nodeId) {
        if (treeviewMode) {
          setTabable(nodeId);
        } else if (nodeMap.current[nodeId] && nodeMap.current[nodeId].nodeActionableRef.current) {
          nodeMap.current[nodeId].nodeActionableRef.current.focus();
        }
      }
    },
    [treeviewMode]
  );

  const focusNextNode = useCallback(
    (nodeId) => {
      const nextNode = getNextNode(nodeId);
      if (nextNode) {
        focus(nextNode);
        return true;
      }

      return false;
    },
    [focus, getNextNode]
  );
  const focusPreviousNode = useCallback(
    (nodeId) => {
      const previousNode = getPreviousNode(nodeId);
      if (previousNode) {
        focus(previousNode);
        return true;
      }

      return false;
    },
    [focus, getPreviousNode]
  );
  const focusFirstNode = useCallback(() => {
    const fNode = getFirstNode();
    if (fNode) {
      focus(fNode);
      return true;
    }

    return false;
  }, [focus, getFirstNode]);
  const focusLastNode = useCallback(() => {
    const lastNode = getLastNode();
    if (lastNode) {
      focus(lastNode);
      return true;
    }

    return false;
  }, [focus, getLastNode]);

  const toggle = useCallback(
    (nodeId) => {
      if (!collapsible) {
        // nothing to do if in non-colapsible mode
        return false;
      }

      const newExpanded = NodeTreeExpandUtils.toggle(expanded, nodeId);
      setExpandedState(newExpanded);

      return true;
    },
    [collapsible, expanded]
  );

  const expandAllSiblings = useCallback(
    (nodeId) => {
      if (!collapsible) {
        // nothing to do if in non-colapsible mode
        return false;
      }

      const newExpanded = NodeTreeExpandUtils.expandAllSiblings(expanded, nodeMap.current, nodeId);
      setExpandedState(newExpanded);

      return true;
    },
    [collapsible, expanded]
  );

  const handleLeftArrow = useCallback(
    (nodeId) => {
      if (collapsible && isExpanded(nodeId)) {
        toggle(nodeId);
        return true;
      }

      const { parent } = nodeMap.current[nodeId];
      if (parent !== -1) {
        focus(parent);
        return true;
      }

      return false;
    },
    [collapsible, focus, isExpanded, toggle]
  );

  const setFocusByFirstCharacter = useCallback(
    (nodeId, char) => {
      const toFocus = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap.current,
        NodeTreeExpandUtils.getVisibleNodes(collapsible ? expanded : true, nodeMap.current),
        nodeId,
        char
      );
      if (toFocus) {
        focus(toFocus);
        return true;
      }

      return false;
    },
    [collapsible, expanded, focus]
  );

  const addNodeToNodeMap = useCallback(
    (nodeId, childrenIds, nodePayloadRef, nodeActionableRef, label) => {
      nodeMap.current = NodeTreeMapUtils.addNodeToNodeMap(nodeMap.current, nodeId, childrenIds, {
        nodePayloadRef,
        nodeActionableRef,
        label,
      });
    },
    []
  );

  const removeNodeFromNodeMap = useCallback((nodeId) => {
    nodeMap.current = NodeTreeMapUtils.removeNodeFromNodeMap(nodeMap.current, nodeId);
  }, []);

  const previousChildIds = useRef([]);
  const childIds = useMemo(() => {
    const ids = React.Children.map(children, (child) => child.props.nodeId) || [];

    if (arrayDiff(previousChildIds.current, ids)) {
      previousChildIds.current = ids;
    }

    return previousChildIds.current;
  }, [children]);

  useEffect(() => {
    addNodeToNodeMap(-1, childIds);

    [firstNode.current] = childIds;

    return () => {
      removeNodeFromNodeMap(-1);
    };
  }, [addNodeToNodeMap, childIds, removeNodeFromNodeMap]);

  useEffect(() => {
    if (treeviewMode) {
      if (selectable && selected != null) {
        // if a node is selected before the tree receives focus,
        // focus is set on the selected node
        // (when adding support for multi-select: if one or more nodes are selected
        // before the tree receives focus, focus is set on the first selected node)
        setTabable(selected);
      } else {
        // if none of the nodes are selected before the tree
        // receives focus, focus is set on the first node
        setTabable(firstNode.current);
      }
    }
  }, [selectable, selected, treeviewMode]);

  const treeControlContext = React.useMemo(
    () => ({
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
    }),
    [
      addNodeToNodeMap,
      collapsible,
      expandAllSiblings,
      focus,
      focusFirstNode,
      focusLastNode,
      focusNextNode,
      focusPreviousNode,
      handleLeftArrow,
      removeNodeFromNodeMap,
      select,
      setFocusByFirstCharacter,
      toggle,
      mode,
    ]
  );

  const treeStateContext = React.useMemo(
    () => ({
      isExpanded,
      isTabbable,
      isSelected,
    }),
    [isExpanded, isSelected, isTabbable]
  );

  return (
    <TreeViewControlContext.Provider value={treeControlContext}>
      <TreeViewStateContext.Provider value={treeStateContext}>
        <ul
          id={id}
          role={treeviewMode ? "tree" : undefined}
          className={clsx(classes.root, className)}
          {...others}
        >
          {children}
        </ul>
      </TreeViewStateContext.Provider>
    </TreeViewControlContext.Provider>
  );
};

TreeView.propTypes = {
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
     * Style applied to component.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Modus operandi (role) of the widget instance.
   */
  mode: PropTypes.oneOf(["treeview", "navigation"]),
  /**
   * Can nodes be selected.
   */
  selectable: PropTypes.bool,
  /**
   * Receives the id of an item present in the list and selects it.
   */
  selected: PropTypes.string,
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible: PropTypes.bool,
  /**
   * Callback fired when a tree item is selected.
   *
   * @param {array} nodeId The id of the selected node.
   */
  onChange: PropTypes.func,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvVerticalNavigationTreeView" })(TreeView);
