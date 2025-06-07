import type { StoryObj } from "@storybook/react-vite";

import { CompleteTableSection } from "./CompleteTableSection";
import { PropsTableSection } from "./PropsTableSection";
import { SimpleTableSection } from "./SimpleTableSection";
import { TableEditable } from "./TableEditable";
import { TableFilter } from "./TableFilter";

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
