import { StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { CompleteTableSection } from "./CompleteTableSection";
import { PropsTableSection } from "./PropsTableSection";
import { SimpleTableSection } from "./SimpleTableSection";
import { TableEditable } from "./TableEditable";
import { TableFilter } from "./TableFilter";
import { TableSettings } from "./TableSettings";

export default {
  title: "Visualizations/Table/Table Section",
};

export const SimpleTableSectionStory: StoryObj = {
  render: () => <SimpleTableSection />,
};

export const CompleteTableSectionStory: StoryObj = {
  render: () => <CompleteTableSection />,
};

export const PropsTableSectionStory: StoryObj = {
  render: () => <PropsTableSection />,
};

export const EditableStory: StoryObj = {
  render: () => <TableEditable />,
};

export const FilterStory: StoryObj = {
  render: () => <TableFilter />,
};

export const TableSettingsStory: StoryObj = {
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /settings/i });
    await userEvent.click(button);
    await expect(canvas.getAllByRole("listitem")).toHaveLength(7);
  },
  render: () => <TableSettings />,
};
