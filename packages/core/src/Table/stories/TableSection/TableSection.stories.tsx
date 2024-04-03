import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { CompleteTableSection } from "./CompleteTableSection";
import CompleteTableSectionRaw from "./CompleteTableSection?raw";
import { PropsTableSection } from "./PropsTableSection";
import PropsTableSectionRaw from "./PropsTableSection?raw";
import { SimpleTableSection } from "./SimpleTableSection";
import SimpleTableSectionRaw from "./SimpleTableSection?raw";
import { TableEditable } from "./TableEditable";
import TableEditableRaw from "./TableEditable?raw";
import { TableFilter } from "./TableFilter";
import TableFilterRaw from "./TableFilter?raw";
import { TableSettings } from "./TableSettings";
import TableSettingsRaw from "./TableSettings?raw";

export default {
  title: "Visualizations/Table/Table Section",
};

export const SimpleTableSectionStory: StoryObj = {
  parameters: {
    docs: { source: { code: SimpleTableSectionRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => <SimpleTableSection />,
};

export const CompleteTableSectionStory: StoryObj = {
  parameters: {
    docs: { source: { code: CompleteTableSectionRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => <CompleteTableSection />,
};

export const PropsTableSectionStory: StoryObj = {
  parameters: {
    docs: { source: { code: PropsTableSectionRaw } },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /expand/i });
    await userEvent.click(button);
  },
  render: () => <PropsTableSection />,
};

export const EditableStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: TableEditableRaw } },
  },
  render: () => <TableEditable />,
};

export const FilterStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableFilterRaw } },
  },
  render: () => <TableFilter />,
};

export const TableSettingsStory: StoryObj = {
  parameters: {
    docs: { source: { code: TableSettingsRaw } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /settings/i });
    await userEvent.click(button);
  },
  render: () => <TableSettings />,
};
