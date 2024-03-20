import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { AlternativeLayout } from "./AlternativeLayout";
import AlternativeLayoutRaw from "./AlternativeLayout?raw";
import { ColumnResize } from "./ColumnResize";
import ColumnResizeRaw from "./ColumnResize?raw";
import { UseHvBulkActions } from "./UseHvBulkActions";
import UseHvBulkActionsRaw from "./UseHvBulkActions?raw";
import { UseHvFilters } from "./UseHvFilters";
import UseHvFiltersRaw from "./UseHvFilters?raw";
import { UseHvGroupBy } from "./UseHvGroupBy";
import UseHvGroupByRaw from "./UseHvGroupBy?raw";
import { UseHvHeaderGroups } from "./UseHvHeaderGroups";
import UseHvHeaderGroupsRaw from "./UseHvHeaderGroups?raw";
import { UseHvHooks } from "./UseHvHooks";
import UseHvHooksRaw from "./UseHvHooks?raw";
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
import { UseHvRowState } from "./UseHvRowState";
import UseHvRowStateRaw from "./UseHvRowState?raw";
import { UseHvSortBy } from "./UseHvSortBy";
import UseHvSortByRaw from "./UseHvSortBy?raw";
import { UseHvTableSticky } from "./UseHvTableSticky";
import UseHvTableStickyRaw from "./UseHvTableSticky?raw";

export default {
  title: "Visualizations/Table/Table Hooks",
};

export const UseHvHooksStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvHooksRaw } } },
  render: () => <UseHvHooks />,
};

export const AlternativeLayoutStory: StoryObj = {
  parameters: { docs: { source: { code: AlternativeLayoutRaw } } },
  render: () => <AlternativeLayout />,
};

export const ColumnResizeStory: StoryObj = {
  parameters: {
    docs: { source: { code: ColumnResizeRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
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
  parameters: {
    docs: { source: { code: LockedSelectionRaw } },
  },
  render: () => <LockedSelection />,
};

export const UseHvFiltersStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvFiltersRaw } } },
  render: () => <UseHvFilters />,
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
  parameters: {
    docs: { source: { code: UseHvRowExpandRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button", { name: /expand/i })[0];
    await userEvent.click(button);
  },
  render: () => <UseHvRowExpand />,
};

export const UseHvGroupByStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvGroupByRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button", { name: /collapse/i })[0];
    await userEvent.click(button);
  },
  render: () => <UseHvGroupBy />,
};

export const UseHvTableStickyStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvTableStickyRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => <UseHvTableSticky />,
};

export const UseHvHeaderGroupsStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvHeaderGroupsRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => <UseHvHeaderGroups />,
};

export const UseHvRowStateStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvRowStateRaw } } },
  render: () => <UseHvRowState />,
};
