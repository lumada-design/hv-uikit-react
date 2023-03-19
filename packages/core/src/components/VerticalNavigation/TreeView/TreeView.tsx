import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useControlled, useForkRef, useUniqueId } from "hooks";
import { HvVerticalNavigationTreeClasses } from "../Navigation/navigationClasses";
import {
  TreeViewControlContext,
  TreeViewStateContext,
} from "./TreeViewContext";
import { DescendantProvider } from "./descendants";
import { StyledRoot } from "./TreeView.styles";
import { NavigationMode } from "../Navigation";
import treeViewClasses from "./treeViewClasses";

function isPrintableCharacter(string) {
  return string && string.length === 1 && string.match(/\S/);
}

function findNextFirstChar(firstChars, startIndex, char) {
  for (let i = startIndex; i < firstChars.length; i += 1) {
    if (char === firstChars[i]) {
      return i;
    }
  }
  return -1;
}

function noopSelection() {
  return false;
}

export const HvVerticalNavigationTreeView = forwardRef(
  (props: HvVerticalNavigationTreeViewProps, ref) => {
    const {
      id: idProp,
      className,
      classes,

      mode = "treeview",

      collapsible = false,
      expanded: expandedProp,
      defaultExpanded = [],
      onToggle,

      selectable = false,
      multiSelect: multiSelectProp = false,
      selected: selectedProp,
      defaultSelected = [],
      onChange,

      disabledItemsFocusable = false,

      onFocus,
      onBlur,
      onKeyDown,

      children,

      ...others
    } = props;

    const treeviewMode = mode === "treeview";
    const multiSelect = selectable && multiSelectProp;

    const treeId = useUniqueId(idProp, "hvtreeview");
    const treeRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(treeRef, ref);

    const [expanded, setExpandedState] = useControlled(
      expandedProp,
      defaultExpanded
    );

    const [selected, setSelectedState] = useControlled(
      selectedProp,
      defaultSelected
    );

    const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

    const nodeMap = useRef({});

    const firstCharMap = useRef({});

    /*
     * Status Helpers
     */
    const isExpanded = useCallback(
      (id) =>
        !collapsible ||
        (Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false),
      [collapsible, expanded]
    );

    const isExpandable = useCallback(
      (id) =>
        collapsible && nodeMap.current[id] && nodeMap.current[id].expandable,
      [collapsible]
    );

    const isSelected = useCallback(
      (id) =>
        selectable &&
        (Array.isArray(selected)
          ? selected.indexOf(id) !== -1
          : selected === id),
      [selectable, selected]
    );

    const isSelectable = useCallback(
      (id) =>
        selectable && nodeMap.current[id] && nodeMap.current[id].selectable,
      [selectable]
    );

    const isDisabled = useCallback((id) => {
      let node = nodeMap.current[id];

      // This can be called before the node has been added to the node map.
      if (!node) {
        return false;
      }

      if (node.disabled) {
        return true;
      }

      while (node.parentId != null) {
        node = nodeMap.current[node.parentId];
        if (node.disabled) {
          return true;
        }
      }

      return false;
    }, []);

    const isFocused = useCallback(
      (id) => focusedNodeId === id,
      [focusedNodeId]
    );

    const isChildSelected = useCallback(
      (id) => selected.startsWith(id),
      [selected]
    );

    /*
     * Child Helpers
     */
    const getChildrenIds = (id: string | null) =>
      Object.keys(nodeMap.current)
        .map((key) => {
          return nodeMap.current[key];
        })
        .filter((node) => node.parentId === id)
        .sort((a, b) => a.index - b.index)
        .map((child) => child.id);

    const getNavigableChildrenIds = useCallback(
      (id: string | null) => {
        let childrenIds = getChildrenIds(id);

        if (!disabledItemsFocusable) {
          childrenIds = childrenIds.filter((node) => !isDisabled(node));
        }
        return childrenIds;
      },
      [disabledItemsFocusable, isDisabled]
    );

    /*
     * Node Helpers
     */
    const getNextNode = useCallback(
      (id: string) => {
        // If expanded get first child
        if (isExpanded(id) && getNavigableChildrenIds(id).length > 0) {
          return getNavigableChildrenIds(id)[0];
        }

        let node = nodeMap.current[id];
        while (node != null) {
          // Try to get next sibling
          const siblings = getNavigableChildrenIds(node.parentId);
          const nextSibling = siblings[siblings.indexOf(node.id) + 1];

          if (nextSibling) {
            return nextSibling;
          }

          // If the sibling does not exist, go up a level to the parent and try again.
          node = nodeMap.current[node.parentId];
        }

        return null;
      },
      [getNavigableChildrenIds, isExpanded]
    );

    const getPreviousNode = (id: string) => {
      const node = nodeMap.current[id];
      const siblings = getNavigableChildrenIds(node.parentId);
      const nodeIndex = siblings.indexOf(id);

      if (nodeIndex === 0) {
        return node.parentId;
      }

      let currentNode = siblings[nodeIndex - 1];
      while (
        isExpanded(currentNode) &&
        getNavigableChildrenIds(currentNode).length > 0
      ) {
        currentNode = getNavigableChildrenIds(currentNode).pop();
      }

      return currentNode;
    };

    const getLastNode = () => {
      let lastNode = getNavigableChildrenIds(null).pop();

      while (isExpanded(lastNode)) {
        lastNode = getNavigableChildrenIds(lastNode).pop();
      }
      return lastNode;
    };
    const getFirstNode = () => getNavigableChildrenIds(null)[0];
    const getParent = (id) => nodeMap.current[id].parentId;

    /**
     * This is used to determine the start and end of a selection range so
     * we can get the nodes between the two border nodes.
     *
     * It finds the nodes' common ancestor using
     * a naive implementation of a lowest common ancestor algorithm
     * (https://en.wikipedia.org/wiki/Lowest_common_ancestor).
     * Then compares the ancestor's 2 children that are ancestors of nodeA and NodeB
     * so we can compare their indexes to work out which node comes first in a depth first search.
     * (https://en.wikipedia.org/wiki/Depth-first_search)
     *
     * Another way to put it is which node is shallower in a trémaux tree
     * https://en.wikipedia.org/wiki/Tr%C3%A9maux_tree
     */
    const findOrderInTremauxTree = useCallback(
      (nodeAId: string, nodeBId: string) => {
        if (nodeAId === nodeBId) {
          return [nodeAId, nodeBId];
        }

        const nodeA = nodeMap.current[nodeAId];
        const nodeB = nodeMap.current[nodeBId];

        if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
          return nodeB.parentId === nodeA.id
            ? [nodeA.id, nodeB.id]
            : [nodeB.id, nodeA.id];
        }

        const aFamily = [nodeA.id];
        const bFamily = [nodeB.id];

        let aAncestor = nodeA.parentId;
        let bAncestor = nodeB.parentId;

        let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
        let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;

        let continueA = true;
        let continueB = true;

        while (!bAncestorIsCommon && !aAncestorIsCommon) {
          if (continueA) {
            aFamily.push(aAncestor);
            aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
            continueA = aAncestor !== null;
            if (!aAncestorIsCommon && continueA) {
              aAncestor = nodeMap.current[aAncestor].parentId;
            }
          }

          if (continueB && !aAncestorIsCommon) {
            bFamily.push(bAncestor);
            bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
            continueB = bAncestor !== null;
            if (!bAncestorIsCommon && continueB) {
              bAncestor = nodeMap.current[bAncestor].parentId;
            }
          }
        }

        const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
        const ancestorFamily = getChildrenIds(commonAncestor);

        const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
        const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];

        return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide)
          ? [nodeAId, nodeBId]
          : [nodeBId, nodeAId];
      },
      []
    );

    const getNodesInRange = useCallback(
      (nodeA, nodeB) => {
        if (nodeA && nodeB) {
          const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
          const nodes = [first];

          let current = first;

          while (current !== last) {
            current = getNextNode(current);
            nodes.push(current);
          }

          return nodes;
        }
        return [];
      },
      [findOrderInTremauxTree, getNextNode]
    );

    /*
     * Focus Helpers
     */
    const focus = (event, id) => {
      if (id) {
        setFocusedNodeId(id);

        if (nodeMap.current[id]?.onFocus) {
          nodeMap.current[id].onFocus(event);
        }
      }
    };

    const focusNextNode = (event, id) => focus(event, getNextNode(id));
    const focusPreviousNode = (event, id) => focus(event, getPreviousNode(id));
    const focusFirstNode = (event) => focus(event, getFirstNode());
    const focusLastNode = (event) => focus(event, getLastNode());

    const focusByFirstCharacter = (event, id, char) => {
      let start;
      let index;
      const lowercaseChar = char.toLowerCase();

      const firstCharIds: string[] = [];
      const firstChars: string[] = [];
      // This really only works since the ids are strings
      Object.keys(firstCharMap.current).forEach((nodeId) => {
        const firstChar = firstCharMap.current[nodeId];
        const map = nodeMap.current[nodeId];
        const visible = map.parentId ? isExpanded(map.parentId) : true;
        const shouldBeSkipped = disabledItemsFocusable
          ? false
          : isDisabled(nodeId);

        if (visible && !shouldBeSkipped) {
          firstCharIds.push(nodeId);
          firstChars.push(firstChar);
        }
      });

      // Get start index for search based on position of currentItem
      start = firstCharIds.indexOf(id) + 1;
      if (start >= firstCharIds.length) {
        start = 0;
      }

      // Check remaining slots in the menu
      index = findNextFirstChar(firstChars, start, lowercaseChar);

      // If not found in remaining slots, check from beginning
      if (index === -1) {
        index = findNextFirstChar(firstChars, 0, lowercaseChar);
      }

      // If match was found...
      if (index > -1) {
        focus(event, firstCharIds[index]);
      }
    };

    /*
     * Expansion Helpers
     */
    const toggleExpansion = useCallback(
      (event, value = focusedNodeId) => {
        let newExpanded;

        if (expanded.indexOf(value) !== -1) {
          newExpanded = expanded.filter((id) => id !== value);
        } else {
          newExpanded = [value].concat(expanded);
        }

        if (onToggle) {
          onToggle(event, newExpanded);
        }

        setExpandedState(newExpanded);
      },
      [expanded, focusedNodeId, onToggle, setExpandedState]
    );

    const expandAllSiblings = (event, id) => {
      const map = nodeMap.current[id];
      const siblings = getChildrenIds(map.parentId);

      const diff = siblings.filter(
        (child) => isExpandable(child) && !isExpanded(child)
      );

      const newExpanded = expanded.concat(diff);

      if (diff.length > 0) {
        setExpandedState(newExpanded);

        if (onToggle) {
          onToggle(event, newExpanded);
        }
      }
    };

    /*
     * Selection Helpers
     */
    const lastSelectedNode = useRef<HTMLDivElement | null>(null);
    const lastSelectionWasRange = useRef(false);
    const currentRangeSelection = useRef<HTMLDivElement[]>([]);

    const isDivElement = (element): element is HTMLDivElement => {
      return (element as HTMLDivElement).nodeType === 1;
    };

    const handleRangeArrowSelect = useCallback(
      (event, nodes: { start?; next?; current? }) => {
        let base = selected.slice();
        const { start, next, current } = nodes;

        if (!next || !current) {
          return;
        }

        if (
          isDivElement(current) &&
          currentRangeSelection.current.indexOf(current) === -1
        ) {
          currentRangeSelection.current = [];
        }

        if (lastSelectionWasRange.current) {
          if (
            isDivElement(next) &&
            currentRangeSelection.current.indexOf(next) !== -1
          ) {
            base = base.filter((id) => id === start || id !== current);
            currentRangeSelection.current =
              currentRangeSelection.current.filter(
                (id) => id === start || id !== current
              );
          } else {
            base.push(next);
            currentRangeSelection.current.push(next);
          }
        } else {
          base.push(next);
          currentRangeSelection.current.push(current, next);
        }

        if (onChange) {
          onChange(
            event,
            base,
            base.map((id) => nodeMap.current[id]?.payload)
          );
        }

        setSelectedState(base);
      },
      [onChange, selected, setSelectedState]
    );

    const handleRangeSelect = useCallback(
      (event, nodes: { start?; end?; current? }) => {
        let base = selected.slice();
        const { start, end } = nodes;
        // If last selection was a range selection ignore nodes that were selected.
        if (lastSelectionWasRange.current) {
          base = base.filter(
            (id) => currentRangeSelection.current.indexOf(id) === -1
          );
        }

        let range = getNodesInRange(start, end);
        range = range.filter((node) => !isDisabled(node));
        currentRangeSelection.current = range;
        let newSelected = base.concat(range);
        newSelected = newSelected.filter(
          (id, i) => newSelected.indexOf(id) === i
        );

        if (onChange) {
          onChange(
            event,
            newSelected,
            newSelected.map((id) => nodeMap.current[id]?.payload)
          );
        }

        setSelectedState(newSelected);
      },
      [getNodesInRange, isDisabled, onChange, selected, setSelectedState]
    );

    const handleMultipleSelect = useCallback(
      (event, value) => {
        let newSelected;
        if (selected.indexOf(value) !== -1) {
          newSelected = selected.filter((id) => id !== value);
        } else {
          newSelected = [value].concat(selected);
        }

        if (onChange) {
          onChange(
            event,
            newSelected,
            newSelected.map((id) => nodeMap.current[id]?.payload)
          );
        }

        setSelectedState(newSelected);
      },
      [onChange, selected, setSelectedState]
    );

    const handleSingleSelect = useCallback(
      (event, value) => {
        const newSelected = multiSelect ? [value] : value;
        if (onChange) {
          const nodeValue = nodeMap.current[newSelected]?.payload;
          onChange(event, newSelected, multiSelect ? [nodeValue] : nodeValue);
        }

        setSelectedState(newSelected);
      },
      [multiSelect, onChange, setSelectedState]
    );

    const selectNode = useCallback(
      (event, id, multiple = false) => {
        if (id && isSelectable(id)) {
          if (multiple) {
            handleMultipleSelect(event, id);
          } else {
            handleSingleSelect(event, id);
          }
          lastSelectedNode.current = id;
          lastSelectionWasRange.current = false;
          currentRangeSelection.current = [];

          return true;
        }
        return false;
      },
      [handleMultipleSelect, handleSingleSelect, isSelectable]
    );

    const selectRange = useCallback(
      (
        event,
        nodes: { start?; end?; current?: HTMLDivElement | null },
        stacked = false
      ) => {
        const { start = lastSelectedNode.current, end, current } = nodes;
        if (stacked) {
          handleRangeArrowSelect(event, { start, next: end, current });
        } else if (start != null && end != null) {
          handleRangeSelect(event, { start, end });
        }
        lastSelectionWasRange.current = true;
      },
      [handleRangeArrowSelect, handleRangeSelect]
    );

    const rangeSelectToFirst = (event, id) => {
      if (!lastSelectedNode.current) {
        lastSelectedNode.current = id;
      }

      const start = lastSelectionWasRange.current
        ? lastSelectedNode.current
        : id;

      selectRange(event, {
        start,
        end: getFirstNode(),
      });
    };

    const rangeSelectToLast = (event: any, id) => {
      if (!lastSelectedNode.current) {
        lastSelectedNode.current = id;
      }

      const start = lastSelectionWasRange.current
        ? lastSelectedNode.current
        : id;

      selectRange(event, {
        start,
        end: getLastNode(),
      });
    };

    const selectNextNode = (event, id) => {
      if (!isDisabled(getNextNode(id))) {
        selectRange(
          event,
          {
            end: getNextNode(id),
            current: id,
          },
          true
        );
      }
    };

    const selectPreviousNode = (event, id) => {
      if (!isDisabled(getPreviousNode(id))) {
        selectRange(
          event,
          {
            end: getPreviousNode(id),
            current: id,
          },
          true
        );
      }
    };

    const selectAllNodes = (event) => {
      selectRange(event, { start: getFirstNode(), end: getLastNode() });
    };

    /*
     * Mapping Helpers
     */
    const registerNode = useCallback((node) => {
      const {
        id,
        index,
        parentId,
        expandable,
        idAttribute,
        disabled,
        selectable: nodeSelectable,
        onFocus: nodeOnFocus,
        payload,
      } = node;

      nodeMap.current[id] = {
        id,
        index,
        parentId,
        expandable,
        idAttribute,
        disabled,
        selectable: nodeSelectable,
        onFocus: nodeOnFocus,
        payload,
      };
    }, []);

    const unregisterNode = useCallback((id) => {
      const newMap = { ...nodeMap.current };
      delete newMap[id];
      nodeMap.current = newMap;

      setFocusedNodeId((oldFocusedNodeId) => {
        if (
          oldFocusedNodeId === id &&
          treeRef.current &&
          treeRef.current ===
            (treeRef.current.ownerDocument || document).activeElement
        ) {
          return getChildrenIds(null)[0];
        }
        return oldFocusedNodeId;
      });
    }, []);

    const mapFirstChar = useCallback((id, firstChar) => {
      firstCharMap.current[id] = firstChar;
    }, []);

    const unMapFirstChar = useCallback((id) => {
      const newMap = { ...firstCharMap.current };
      delete newMap[id];
      firstCharMap.current = newMap;
    }, []);

    /**
     * Event handlers and Navigation
     */
    const handleNextArrow = (event) => {
      if (isExpandable(focusedNodeId)) {
        if (isExpanded(focusedNodeId)) {
          focusNextNode(event, focusedNodeId);
        } else if (!isDisabled(focusedNodeId)) {
          toggleExpansion(event);
        }
      }
      return true;
    };

    const handlePreviousArrow = (event) => {
      if (isExpanded(focusedNodeId) && !isDisabled(focusedNodeId)) {
        toggleExpansion(event, focusedNodeId);
        return true;
      }

      const parent = getParent(focusedNodeId);
      if (parent) {
        focus(event, parent);
        return true;
      }
      return false;
    };

    const handleKeyDown = (event) => {
      let flag = false;
      const { key } = event;

      // If the tree is empty there will be no focused node
      if (
        event.altKey ||
        event.currentTarget !== event.target ||
        !focusedNodeId
      ) {
        return;
      }

      const ctrlPressed = event.ctrlKey || event.metaKey;
      switch (key) {
        case " ":
          if (isSelectable(focusedNodeId) && !isDisabled(focusedNodeId)) {
            if (multiSelect && event.shiftKey) {
              selectRange(event, { end: focusedNodeId });
              flag = true;
            } else if (multiSelect) {
              flag = selectNode(event, focusedNodeId, true);
            } else {
              flag = selectNode(event, focusedNodeId);
            }
          }
          event.stopPropagation();
          break;
        case "Enter":
          if (!isDisabled(focusedNodeId)) {
            if (isExpandable(focusedNodeId)) {
              toggleExpansion(event);
              flag = true;
            } else if (isSelectable(focusedNodeId)) {
              if (multiSelect && event.shiftKey) {
                selectRange(event, { end: focusedNodeId });
                flag = true;
              } else if (multiSelect) {
                flag = selectNode(event, focusedNodeId, true);
              } else {
                flag = selectNode(event, focusedNodeId);
              }
            }
          }
          event.stopPropagation();
          break;
        case "ArrowDown":
          if (multiSelect && event.shiftKey) {
            selectNextNode(event, focusedNodeId);
          }
          focusNextNode(event, focusedNodeId);
          flag = true;
          break;
        case "ArrowUp":
          if (multiSelect && event.shiftKey) {
            selectPreviousNode(event, focusedNodeId);
          }
          focusPreviousNode(event, focusedNodeId);
          flag = true;
          break;
        case "ArrowRight":
          flag = handleNextArrow(event);
          break;
        case "ArrowLeft":
          flag = handlePreviousArrow(event);
          break;
        case "Home":
          if (
            multiSelect &&
            ctrlPressed &&
            event.shiftKey &&
            !isDisabled(focusedNodeId)
          ) {
            rangeSelectToFirst(event, focusedNodeId);
          }
          focusFirstNode(event);
          flag = true;
          break;
        case "End":
          if (
            multiSelect &&
            ctrlPressed &&
            event.shiftKey &&
            !isDisabled(focusedNodeId)
          ) {
            rangeSelectToLast(event, focusedNodeId);
          }
          focusLastNode(event);
          flag = true;
          break;
        default:
          if (key === "*") {
            expandAllSiblings(event, focusedNodeId);
            flag = true;
          } else if (multiSelect && ctrlPressed && key.toLowerCase() === "a") {
            selectAllNodes(event);
            flag = true;
          } else if (
            !ctrlPressed &&
            !event.shiftKey &&
            isPrintableCharacter(key)
          ) {
            focusByFirstCharacter(event, focusedNodeId, key);
            flag = true;
          }
      }

      if (flag) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    const handleFocus = (event) => {
      // if the event bubbled (which is React specific) we don't want to steal focus
      if (event.target === event.currentTarget) {
        const firstSelected = Array.isArray(selected) ? selected[0] : selected;
        focus(event, firstSelected || getNavigableChildrenIds(null)[0]);
      }

      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event) => {
      setFocusedNodeId(null);

      if (onBlur) {
        onBlur(event);
      }
    };

    const activeDescendant =
      focusedNodeId && nodeMap.current[focusedNodeId]
        ? nodeMap.current[focusedNodeId].idAttribute
        : null;

    const treeControlContext = useMemo(
      () => ({
        treeId,
        mode,
        collapsible,
        toggleExpansion,
        multiSelect,
        selectNode: selectable ? selectNode : noopSelection,
        selectRange: selectable ? selectRange : noopSelection,
        disabledItemsFocusable,
        registerNode,
        unregisterNode,
        mapFirstChar,
        unMapFirstChar,
        focus,
      }),
      [
        registerNode,
        unregisterNode,
        mapFirstChar,
        unMapFirstChar,
        toggleExpansion,
        selectable,
        selectNode,
        selectRange,
        mode,
        collapsible,
        multiSelect,
        disabledItemsFocusable,
        treeId,
      ]
    );

    const treeStateContext = useMemo(
      () => ({
        isExpanded,
        isSelected,
        isFocused,
        isDisabled,
        isChildSelected,
      }),
      [isDisabled, isExpanded, isFocused, isSelected, isChildSelected]
    );

    return (
      <TreeViewControlContext.Provider value={treeControlContext}>
        <TreeViewStateContext.Provider value={treeStateContext}>
          <DescendantProvider>
            <StyledRoot
              ref={handleRef}
              id={idProp}
              className={clsx(treeViewClasses.root, classes?.root, className)}
              {...(treeviewMode && {
                id: treeId,
                role: "tree",
                "aria-multiselectable": multiSelect,
                "aria-activedescendant": activeDescendant,
                tabIndex: 0,
                onFocus: handleFocus,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
              })}
              {...others}
            >
              {children}
            </StyledRoot>
          </DescendantProvider>
        </TreeViewStateContext.Provider>
      </TreeViewControlContext.Provider>
    );
  }
);

export type HvVerticalNavigationTreeViewProps = {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the Radio button.
   */
  classes?: HvVerticalNavigationTreeClasses;
  /**
   * Modus operandi (role) of the widget instance.
   */
  mode?: NavigationMode;
  /**
   * Enables selection.
   * @default false
   */
  selectable?: boolean;
  /**
   * Enables the simultaneous selection of multiple items.
   * @default false
   */
  multiSelect?: boolean;
  /**
   * The selected nodes' ids.
   *
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string[] | string;
  /**
   * When uncontrolled, defines the initial selected nodes' ids.
   *
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelected?: string[] | string;
  /**
   * Can non-leaf nodes be collapsed / expanded.
   */
  collapsible?: boolean;
  /**
   * Callback fired when a tree item is selected.
   *
   * @param {object} event The event source of the callback.
   * @param {string} nodeId The id of the selected node.
   */
  onChange?: any;
  /**
   * Expanded nodes' ids.
   */
  expanded?: string[];
  /**
   * When uncontrolled, defines the initial expanded nodes' ids.
   * @default []
   */
  defaultExpanded?: string[];
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes (old and new).
   */
  onToggle?: (event, nodeIds) => void;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * @ignore
   */
  onFocus?: (event: React.FocusEvent<any>) => void;
  /**
   * @ignore
   */
  onBlur?: (event: any) => void;
  /**
   * @ignore
   */
  onKeyDown?: (event: KeyboardEvent) => void;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
};
