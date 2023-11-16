/// <reference types="vite/client" />
/* eslint-disable import/no-duplicates */

import { StoryObj } from "@storybook/react";

import { AlternativeLayout } from "./AlternativeLayout";
import AlternativeLayoutRaw from "./AlternativeLayout?raw";
import { ColumnResize } from "./ColumnResize";
import ColumnResizeRaw from "./ColumnResize?raw";
import { UseHvHooks } from "./UseHvHooks";
import UseHvHooksRaw from "./UseHvHooks?raw";
import { UseHvBulkActions } from "./UseHvBulkActions";
import UseHvBulkActionsRaw from "./UseHvBulkActions?raw";
import { UseHvGroupBy } from "./UseHvGroupBy";
import UseHvGroupByRaw from "./UseHvGroupBy?raw";
import { UseHvHeaderGroups } from "./UseHvHeaderGroups";
import UseHvHeaderGroupsRaw from "./UseHvHeaderGroups?raw";
import { UseHvPagination } from "./UseHvPagination";
import UseHvPaginationRaw from "./UseHvPagination?raw";
import { UseHvRowExpand } from "./UseHvRowExpand";
import UseHvRowExpandRaw from "./UseHvRowExpand?raw";
import { UseHvSelection } from "./UseHvRowSelection";
import UseHvSelectionRaw from "./UseHvRowSelection?raw";
import { UseHvSelectionControlled } from "./UseHvRowSelectionControlled";
import UseHvSelectionControlledRaw from "./UseHvRowSelectionControlled?raw";
import { LockedSelection } from "./UseHvRowSelectionLocked";
import LockedSelectionRaw from "./UseHvRowSelectionLocked?raw";
import { UseHvSortBy } from "./UseHvSortBy";
import UseHvSortByRaw from "./UseHvSortBy?raw";
import { UseHvTableSticky } from "./UseHvTableSticky";
import UseHvTableStickyRaw from "./UseHvTableSticky?raw";

export const UseHvHooksStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvHooksRaw } } },
  render: () => <UseHvHooks />,
};

export const AlternativeLayoutStory: StoryObj = {
  parameters: { docs: { source: { code: AlternativeLayoutRaw } } },
  render: () => <AlternativeLayout />,
};

export const ColumnResizeStory: StoryObj = {
  parameters: { docs: { source: { code: ColumnResizeRaw } } },
  render: () => <ColumnResize />,
};

export const UseHvPaginationStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvPaginationRaw } } },
  render: () => <UseHvPagination />,
};

export const UseHvSelectionStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvSelectionRaw } } },
  render: () => <UseHvSelection />,
};

export const UseHvSelectionControlledStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvSelectionControlledRaw } } },
  render: () => <UseHvSelectionControlled />,
};

export const LockedSelectionStory: StoryObj = {
  parameters: { docs: { source: { code: LockedSelectionRaw } } },
  render: () => <LockedSelection />,
};

export const UseHvBulkActionsStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvBulkActionsRaw } } },
  render: () => <UseHvBulkActions />,
};

export const UseHvSortByStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvSortByRaw } } },
  render: () => <UseHvSortBy />,
};

export const UseHvRowExpandStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvRowExpandRaw } } },
  render: () => <UseHvRowExpand />,
};

export const UseHvGroupByStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvGroupByRaw } } },
  render: () => <UseHvGroupBy />,
};

export const UseHvTableStickyStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvTableStickyRaw } } },
  render: () => <UseHvTableSticky />,
};

export const UseHvHeaderGroupsStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvHeaderGroupsRaw } } },
  render: () => <UseHvHeaderGroups />,
};
