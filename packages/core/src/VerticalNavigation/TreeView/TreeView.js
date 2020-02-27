import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback
} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../../useUniqueId";

import {
  TreeViewControlContext,
  TreeViewStateContext
} from "./TreeViewContexts";

import arrayDiff from "../../utils/arrayDiff";
import usePropAsRef from "../../utils/usePropAsRef";

import styles from "./styles";

export class NodeTreeNavigationUtils {
  static getNextNode(isExpanded, nodeMap, nodeId, end = false) {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    if (!end) {
      if (node.children && node.children.length > 0 && isExpanded(nodeId)) {
        return node.children[0];
      }
    }

    if (parent) {
      const nodeIndex = parent.children.indexOf(nodeId);
      const nextIndex = nodeIndex + 1;

      if (parent.children.length > nextIndex) {
        return parent.children[nextIndex];
      }

      if (node.parent !== -1) {
        return NodeTreeNavigationUtils.getNextNode(
          isExpanded,
          nodeMap,
          node.parent,
          true
        );
      }
    }

    return null;
  }

  static getPreviousNode(isExpanded, nodeMap, nodeId) {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    if (parent) {
      const nodeIndex = parent.children.indexOf(nodeId);

      if (nodeIndex > 0) {
        return NodeTreeNavigationUtils.getLastNode(
          isExpanded,
          nodeMap,
          parent.children[nodeIndex - 1]
        );
      }

      if (node.parent !== -1) {
        return node.parent;
      }
    }

    return null;
  }

  static getLastNode(isExpanded, nodeMap, nodeId = -1) {
    const node = nodeMap[nodeId];
    const open = nodeId === -1 || isExpanded(nodeId);
    if (open && node.children && node.children.length > 0) {
      return NodeTreeNavigationUtils.getLastNode(
        isExpanded,
        nodeMap,
        node.children[node.children.length - 1]
      );
    }

    return nodeId;
  }

  static getNodeByFirstCharacter(nodeMap, visibleNodes, nodeId, char) {
    const lowercaseChar = char.toLowerCase();

    let toFocus = null;
    let useNext = false;
    visibleNodes.forEach(nId => {
      const node = nodeMap[nId];
      const firstChar = node.label.substring(0, 1).toLowerCase();

      if (
        (!toFocus || useNext) &&
        lowercaseChar === firstChar &&
        nId !== nodeId
      ) {
        toFocus = nId;

        useNext = false;
      }

      if (nId === nodeId) {
        useNext = true;
      }
    });

    if (toFocus) {
      return toFocus;
    }

    return null;
  }
}

export class NodeTreeExpandUtils {
  static isExpanded(expanded, nodeId) {
    return expanded.indexOf(nodeId) !== -1;
  }

  static toggle(expanded, nodeId) {
    let newExpanded;
    if (expanded.indexOf(nodeId) !== -1) {
      newExpanded = expanded.filter(
        expandedNodeId => expandedNodeId !== nodeId
      );
    } else {
      newExpanded = [...expanded, nodeId];
    }

    return newExpanded;
  }

  static expandAllSiblings(expanded, nodeMap, nodeId) {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    const diff = parent.children
      .filter(childNode => nodeMap[childNode].children != null)
      .filter(
        childNode => !NodeTreeExpandUtils.isExpanded(expanded, childNode)
      );

    if (diff.length > 0) {
      return [...expanded, ...diff];
    }

    return expanded;
  }

  static getVisibleNodes(expanded, nodeMap, nodeId = -1) {
    const toReturn = [];
    if (nodeId !== -1) {
      toReturn.push(nodeId);
    }

    const visibleChilds =
      nodeId === -1 ||
      expanded === true ||
      NodeTreeExpandUtils.isExpanded(expanded, nodeId);

    if (visibleChilds) {
      const node = nodeMap[nodeId];

      if (node && node.children) {
        node.children.forEach(childId =>
          toReturn.push(
            ...NodeTreeExpandUtils.getVisibleNodes(expanded, nodeMap, childId)
          )
        );
      }
    }

    return toReturn;
  }
}

export class NodeTreeMapUtils {
  static addNodeToNodeMap(nodeMap, nodeId, childrenIds, nodeData) {
    const newMap = { ...nodeMap };

    const currentMap = newMap[nodeId];
    newMap[nodeId] = {
      ...currentMap,
      children: childrenIds,
      ...nodeData
    };
    childrenIds.forEach(childId => {
      const currentChildMap = newMap[childId];
      // eslint-disable-next-line no-param-reassign
      newMap[childId] = {
        ...currentChildMap,
        parent: nodeId
      };
    });

    return newMap;
  }

  static removeNodeFromNodeMap(nodeMap, nodeId) {
    const node = nodeMap[nodeId];
    if (node) {
      const newMap = { ...nodeMap };

      if (node.parent) {
        const parentNode = newMap[node.parent];
        if (parentNode && parentNode.children) {
          const parentChildren = parentNode.children.filter(c => c !== nodeId);
          newMap[node.parent] = {
            ...parentNode,
            children: parentChildren
          };
        }
      }

      delete newMap[nodeId];

      return newMap;
    }

    return nodeMap;
  }
}

const TreeView = props => {
  const {
    id,
    className,
    classes,
    mode,
    collapsible,
    selectable,
    selected,
    onChange,
    children,
    // eslint-disable-next-line react/prop-types
    theme,
    ...other
  } = props;

  const internalId = useUniqueId(id, "hv-verticalnavigation-treeview");

  const [tabable, setTabable] = useState(null);

  const [expanded, setExpandedState] = useState([]);

  const firstNode = useRef(null);
  const nodeMap = useRef({});

  const treeviewMode = mode === "treeview";

  const isExpanded = useCallback(
    nodeId => !collapsible || NodeTreeExpandUtils.isExpanded(expanded, nodeId),
    [collapsible, expanded]
  );
  const isTabbable = useCallback(
    nodeId => !treeviewMode || tabable === nodeId,
    [treeviewMode, tabable]
  );
  const isSelected = useCallback(
    nodeId => selectable && selected != null && selected === nodeId,
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
    nodeId =>
      NodeTreeNavigationUtils.getNextNode(isExpanded, nodeMap.current, nodeId),
    [isExpanded]
  );
  const getPreviousNode = useCallback(
    nodeId =>
      NodeTreeNavigationUtils.getPreviousNode(
        isExpanded,
        nodeMap.current,
        nodeId
      ),
    [isExpanded]
  );
  const getFirstNode = useCallback(() => {
    if (firstNode.current) {
      return firstNode.current;
    }

    return null;
  }, []);
  const getLastNode = useCallback(
    (nodeId = -1) =>
      NodeTreeNavigationUtils.getLastNode(isExpanded, nodeMap.current, nodeId),
    [isExpanded]
  );

  const focus = useCallback(
    nodeId => {
      if (nodeId) {
        if (treeviewMode) {
          setTabable(nodeId);
        } else if (
          nodeMap.current[nodeId] &&
          nodeMap.current[nodeId].nodeActionableRef.current
        ) {
          nodeMap.current[nodeId].nodeActionableRef.current.focus();
        }
      }
    },
    [treeviewMode]
  );

  const focusNextNode = useCallback(
    nodeId => {
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
    nodeId => {
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
    nodeId => {
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
    nodeId => {
      if (!collapsible) {
        // nothing to do if in non-colapsible mode
        return false;
      }

      const newExpanded = NodeTreeExpandUtils.expandAllSiblings(
        expanded,
        nodeMap.current,
        nodeId
      );
      setExpandedState(newExpanded);

      return true;
    },
    [collapsible, expanded]
  );

  const handleLeftArrow = useCallback(
    nodeId => {
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
        NodeTreeExpandUtils.getVisibleNodes(
          collapsible ? expanded : true,
          nodeMap.current
        ),
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
      nodeMap.current = NodeTreeMapUtils.addNodeToNodeMap(
        nodeMap.current,
        nodeId,
        childrenIds,
        { nodePayloadRef, nodeActionableRef, label }
      );
    },
    []
  );

  const removeNodeFromNodeMap = useCallback(nodeId => {
    nodeMap.current = NodeTreeMapUtils.removeNodeFromNodeMap(
      nodeMap.current,
      nodeId
    );
  }, []);

  const previousChildIds = useRef([]);
  const childIds = useMemo(() => {
    const ids = React.Children.map(children, child => child.props.nodeId) || [];

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
      mode
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
      mode
    ]
  );

  const treeStateContext = React.useMemo(
    () => ({
      isExpanded,
      isTabbable,
      isSelected
    }),
    [isExpanded, isSelected, isTabbable]
  );

  return (
    <TreeViewControlContext.Provider value={treeControlContext}>
      <TreeViewStateContext.Provider value={treeStateContext}>
        <ul
          id={internalId}
          role={treeviewMode ? "tree" : undefined}
          className={clsx(classes.root, className)}
          {...other}
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
    root: PropTypes.string
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
  children: PropTypes.node
};

TreeView.defaultProps = {
  id: undefined,
  className: "",
  mode: "treeview",
  selectable: true,
  selected: null,
  collapsible: false,
  onChange: null,
  children: null
};

export default withStyles(styles, { name: "HvVerticalNavigationTreeView" })(
  TreeView
);
