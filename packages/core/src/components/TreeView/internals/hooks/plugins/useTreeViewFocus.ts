import * as React from "react";
import { EventHandlers } from "@mui/base/utils";
import { ownerDocument, useEventCallback } from "@mui/material/utils";

import type { TreeViewPlugin, TreeViewPluginSignature } from "../../types";
import { populateInstance } from "../utils";
import { useInstanceEventHandler } from "../useInstanceEventHandler";
import type { UseTreeViewNodesSignature } from "./useTreeViewNodes";
import type { UseTreeViewSelectionSignature } from "./useTreeViewSelection";
import type { UseTreeViewExpansionSignature } from "./useTreeViewExpansion";

export interface UseTreeViewFocusInstance {
  isNodeFocused: (nodeId: string) => boolean;
  focusNode: (event: React.SyntheticEvent, nodeId: string | null) => void;
}

export interface UseTreeViewFocusParameters {
  /**
   * Callback fired when tree items are focused.
   * @param {React.SyntheticEvent} event The event source of the callback **Warning**: This is a generic event not a focus event.
   * @param {string} nodeId The id of the node focused.
   * @param {string} value of the focused node.
   */
  onNodeFocus?: (event: React.SyntheticEvent, nodeId: string) => void;
}

export type UseTreeViewFocusDefaultizedParameters = UseTreeViewFocusParameters;

export interface UseTreeViewFocusState {
  focusedNodeId: string | null;
}

export type UseTreeViewFocusSignature = TreeViewPluginSignature<
  UseTreeViewFocusParameters,
  UseTreeViewFocusParameters,
  UseTreeViewFocusInstance,
  {},
  UseTreeViewFocusState,
  never,
  [
    UseTreeViewNodesSignature,
    UseTreeViewSelectionSignature<any>,
    UseTreeViewExpansionSignature
  ]
>;

export const useTreeViewFocus: TreeViewPlugin<UseTreeViewFocusSignature> = ({
  instance,
  params,
  state,
  setState,
  models,
  rootRef,
}) => {
  const setFocusedNodeId = useEventCallback(
    (nodeId: React.SetStateAction<string | null>) => {
      const cleanNodeId =
        typeof nodeId === "function" ? nodeId(state.focusedNodeId) : nodeId;
      setState((prevState) => ({ ...prevState, focusedNodeId: cleanNodeId }));
    }
  );

  const isNodeFocused = React.useCallback(
    (nodeId: string) => state.focusedNodeId === nodeId,
    [state.focusedNodeId]
  );

  const focusNode = useEventCallback(
    (event: React.SyntheticEvent, nodeId: string | null) => {
      if (nodeId) {
        setFocusedNodeId(nodeId);

        if (params.onNodeFocus) {
          params.onNodeFocus(event, nodeId);
        }
      }
    }
  );

  populateInstance<UseTreeViewFocusSignature>(instance, {
    isNodeFocused,
    focusNode,
  });

  useInstanceEventHandler(instance as any, "removeNode", ({ id }) => {
    setFocusedNodeId((oldFocusedNodeId) => {
      if (
        oldFocusedNodeId === id &&
        rootRef.current === ownerDocument(rootRef.current).activeElement
      ) {
        return instance.getChildrenIds(null)[0];
      }
      return oldFocusedNodeId;
    });
  });

  const createHandleFocus =
    (otherHandlers: EventHandlers) =>
    (event: React.FocusEvent<HTMLUListElement>) => {
      otherHandlers.onFocus?.(event);

      // if the event bubbled (which is React specific) we don't want to steal focus
      if (event.target === event.currentTarget) {
        const isNodeVisible = (nodeId: string) => {
          const node = instance.getNode(nodeId);
          return (
            node &&
            (node.parentId == null || instance.isNodeExpanded(node.parentId))
          );
        };

        let nodeToFocusId: string | null | undefined;
        if (Array.isArray(models.selected.value)) {
          nodeToFocusId = models.selected.value.find(isNodeVisible);
        } else if (
          models.selected.value != null &&
          isNodeVisible(models.selected.value)
        ) {
          nodeToFocusId = models.selected.value;
        }

        if (nodeToFocusId == null) {
          // eslint-disable-next-line prefer-destructuring
          nodeToFocusId = instance.getNavigableChildrenIds(null)[0];
        }

        instance.focusNode(event, nodeToFocusId);
      }
    };

  const createHandleBlur =
    (otherHandlers: EventHandlers) =>
    (event: React.FocusEvent<HTMLUListElement>) => {
      otherHandlers.onBlur?.(event);
      setFocusedNodeId(null);
    };

  const focusedNode = instance.getNode(state.focusedNodeId!);
  const activeDescendant = focusedNode ? focusedNode.idAttribute : null;

  return {
    getRootProps: (otherHandlers) => ({
      onFocus: createHandleFocus(otherHandlers),
      onBlur: createHandleBlur(otherHandlers),
      "aria-activedescendant": activeDescendant ?? undefined,
    }),
  };
};

useTreeViewFocus.getInitialState = () => ({ focusedNodeId: null });

useTreeViewFocus.getDefaultizedParams = (params) => ({
  ...params,
  disabledItemsFocusable: params.disabledItemsFocusable ?? false,
});
