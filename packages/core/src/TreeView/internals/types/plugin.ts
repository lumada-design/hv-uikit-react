import * as React from "react";
import { EventHandlers } from "@mui/base/utils";

import type { TreeViewCorePluginsSignature } from "../corePlugins";
import type { TreeViewContextValue } from "../TreeViewProvider";
import type { TreeViewEventLookupElement } from "./events";
import type { MergePluginsProperty } from "./helpers";
import type { TreeViewModel } from "./treeView";

export interface TreeViewPluginOptions<
  TSignature extends TreeViewAnyPluginSignature,
> {
  instance: TreeViewUsedInstance<TSignature>;
  params: TreeViewUsedDefaultizedParams<TSignature>;
  state: TreeViewUsedState<TSignature>;
  models: TreeViewUsedModels<TSignature>;
  setState: React.Dispatch<React.SetStateAction<TreeViewUsedState<TSignature>>>;
  rootRef: React.RefObject<HTMLUListElement>;
}

type TreeViewModelsInitializer<TSignature extends TreeViewAnyPluginSignature> =
  {
    [TControlled in keyof TSignature["models"]]: {
      controlledProp: TControlled;
      defaultProp: keyof TSignature["params"];
    };
  };

interface TreeViewResponse {
  getRootProps?: <TOther extends EventHandlers = {}>(
    otherHandlers: TOther,
  ) => React.HTMLAttributes<HTMLUListElement>;
  contextValue?: TreeViewContextValue<any>;
}

export type TreeViewPluginSignature<
  TParams extends {},
  TDefaultizedParams extends {},
  TInstance extends {},
  TEvents extends { [key in keyof TEvents]: TreeViewEventLookupElement },
  TState extends {},
  TModelNames extends keyof TDefaultizedParams,
  TDependantPlugins extends readonly TreeViewAnyPluginSignature[],
> = {
  params: TParams;
  defaultizedParams: TDefaultizedParams;
  instance: TInstance;
  state: TState;
  models: {
    [TControlled in TModelNames]-?: TreeViewModel<
      Exclude<TDefaultizedParams[TControlled], undefined>
    >;
  };
  events: TEvents;
  dependantPlugins: TDependantPlugins;
};

export type TreeViewAnyPluginSignature = {
  state: any;
  instance: any;
  params: any;
  defaultizedParams: any;
  dependantPlugins: any;
  events: any;
  models: any;
};

type TreeViewUsedPlugins<TSignature extends TreeViewAnyPluginSignature> = [
  TreeViewCorePluginsSignature,
  ...TSignature["dependantPlugins"],
];

type TreeViewUsedParams<TSignature extends TreeViewAnyPluginSignature> =
  TSignature["params"] &
    MergePluginsProperty<TreeViewUsedPlugins<TSignature>, "params">;

type TreeViewUsedDefaultizedParams<
  TSignature extends TreeViewAnyPluginSignature,
> = TSignature["defaultizedParams"] &
  MergePluginsProperty<TreeViewUsedPlugins<TSignature>, "defaultizedParams">;

export type TreeViewUsedInstance<
  TSignature extends TreeViewAnyPluginSignature,
> = TSignature["instance"] &
  MergePluginsProperty<TreeViewUsedPlugins<TSignature>, "instance"> & {
    /**
     * Private property only defined in TypeScript to be able to access the plugin signature from the instance object.
     */
    $$signature: TSignature;
  };

type TreeViewUsedState<TSignature extends TreeViewAnyPluginSignature> =
  TSignature["state"] &
    MergePluginsProperty<TreeViewUsedPlugins<TSignature>, "state">;

export type TreeViewUsedModels<TSignature extends TreeViewAnyPluginSignature> =
  TSignature["models"] &
    MergePluginsProperty<TreeViewUsedPlugins<TSignature>, "models">;

export type TreeViewUsedEvents<TSignature extends TreeViewAnyPluginSignature> =
  TSignature["events"] &
    MergePluginsProperty<TreeViewUsedPlugins<TSignature>, "events">;

export type TreeViewPlugin<TSignature extends TreeViewAnyPluginSignature> = {
  (options: TreeViewPluginOptions<TSignature>): void | TreeViewResponse;
  getDefaultizedParams?: (
    params: TreeViewUsedParams<TSignature>,
  ) => TSignature["defaultizedParams"];
  getInitialState?: (
    params: TreeViewUsedDefaultizedParams<TSignature>,
  ) => TSignature["state"];
  models?: TreeViewModelsInitializer<TSignature>;
};
