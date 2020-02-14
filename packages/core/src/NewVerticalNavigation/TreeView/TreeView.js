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

import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import useUniqueId from "../../useUniqueId";

import {
  TreeViewControlContext,
  TreeViewStateContext
} from "./TreeViewContexts";

import arrayDiff from "../../utils/arrayDiff";
import usePropAsRef from "../../utils/usePropAsRef";

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
    nodeId => !collapsible || expanded.indexOf(nodeId) !== -1,
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

  const getLastNode = useCallback(
    nodeId => {
      const map = nodeMap.current[nodeId];
      if (isExpanded(nodeId) && map.children && map.children.length > 0) {
        return getLastNode(map.children[map.children.length - 1]);
      }

      return nodeId;
    },
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

  const getNextNode = useCallback(
    (nodeId, end) => {
      const map = nodeMap.current[nodeId];
      const parent = nodeMap.current[map.parent];

      if (!end) {
        if (map.children && map.children.length > 0 && isExpanded(nodeId)) {
          return map.children[0];
        }
      }

      if (parent) {
        const nodeIndex = parent.children.indexOf(nodeId);
        const nextIndex = nodeIndex + 1;

        if (parent.children.length > nextIndex) {
          return parent.children[nextIndex];
        }

        if (parent.nodeId !== -1) {
          return getNextNode(parent.nodeId, true);
        }
      }

      return null;
    },
    [isExpanded]
  );

  const getPreviousNode = useCallback(
    nodeId => {
      const map = nodeMap.current[nodeId];
      const parent = nodeMap.current[map.parent];

      if (parent) {
        const nodeIndex = parent.children.indexOf(nodeId);

        if (nodeIndex > 0) {
          return getLastNode(parent.children[nodeIndex - 1]);
        }

        if (parent.nodeId !== -1) {
          return parent.nodeId;
        }
      }

      return null;
    },
    [getLastNode]
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
    if (firstNode.current) {
      focus(firstNode.current);
      return true;
    }

    return false;
  }, [focus]);
  const focusLastNode = useCallback(() => {
    const topLevelNodes = nodeMap.current[-1].children;
    const lastNode = getLastNode(topLevelNodes[topLevelNodes.length - 1]);
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

      let newExpanded;
      if (expanded.indexOf(nodeId) !== -1) {
        newExpanded = expanded.filter(
          expandedNodeId => expandedNodeId !== nodeId
        );

        if (treeviewMode) {
          setTabable(oldTabable => {
            const map = nodeMap.current[oldTabable];
            if (
              oldTabable &&
              (map && map.parent ? map.parent.nodeId : null) === nodeId
            ) {
              return nodeId;
            }

            return oldTabable;
          });
        }
      } else {
        newExpanded = [nodeId, ...expanded];
      }

      setExpandedState(newExpanded);

      return true;
    },
    [collapsible, expanded, treeviewMode]
  );

  const expandAllSiblings = useCallback(
    nodeId => {
      if (!collapsible) {
        // nothing to do if in non-colapsible mode
        return false;
      }

      const map = nodeMap.current[nodeId];
      const parent = nodeMap.current[map.parent];

      let diff;
      if (parent) {
        diff = parent.children.filter(child => !isExpanded(child));
      } else {
        const topLevelNodes = nodeMap.current[-1].children;
        diff = topLevelNodes.filter(node => !isExpanded(node));
      }
      const newExpanded = [...expanded, ...diff];

      setExpandedState(newExpanded);

      return true;
    },
    [collapsible, expanded, isExpanded]
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

  const getVisibleNodes = useCallback(
    (nId = -1) => {
      const toReturn = [];

      const node = nodeMap.current[nId];

      if (node && node.children) {
        const visible = !node.parent || isExpanded(nId);
        if (visible) {
          if (node.parent) {
            toReturn.push(nId);
          }

          node.children.forEach(cId => toReturn.push(...getVisibleNodes(cId)));
        }
      }

      return toReturn;
    },
    [isExpanded]
  );

  const setFocusByFirstCharacter = useCallback(
    (nodeId, char) => {
      const lowercaseChar = char.toLowerCase();

      const visibleNodes = getVisibleNodes();

      let toFocus = null;
      let useNext = false;
      visibleNodes.forEach(nId => {
        const node = nodeMap.current[nId];
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
        focus(toFocus);
        return true;
      }

      return false;
    },
    [focus, getVisibleNodes]
  );

  const addNodeToNodeMap = useCallback(
    (nodeId, childrenIds, nodePayloadRef, nodeActionableRef, label) => {
      const currentMap = nodeMap.current[nodeId];
      nodeMap.current[nodeId] = {
        ...currentMap,
        children: childrenIds,
        nodeId,
        nodePayloadRef,
        nodeActionableRef,
        label
      };
      childrenIds.forEach(childId => {
        const currentChildMap = nodeMap.current[childId];
        nodeMap.current[childId] = {
          ...currentChildMap,
          parent: nodeId,
          id: childId
        };
      });
    },
    []
  );

  const removeNodeFromNodeMap = useCallback(nodeId => {
    const map = nodeMap.current[nodeId];
    if (map) {
      if (map.parent) {
        const parentMap = nodeMap.current[map.parent];
        if (parentMap && parentMap.children) {
          const parentChildren = parentMap.children.filter(c => c !== nodeId);
          nodeMap.current[map.parent] = {
            ...parentMap,
            children: parentChildren
          };
        }
      }

      delete nodeMap.current[nodeId];
    }
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
          className={classNames(classes.root, className)}
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

export default TreeView;
