import type { StoryObj } from "@storybook/react";

import { AllColumnRenderers } from "./AllColumnRenderers";
import { DateColumnRenderer } from "./DateColumnRenderer";
import { DropdownColumnRenderer } from "./DropdownColumnRenderer";
import { ExpandColumnRenderer } from "./ExpandColumnRenderer";
import { NumberColumnRenderer } from "./NumberColumnRenderer";
import { ProgressColumnRenderer } from "./ProgressColumnRenderer";
import { SwitchColumnRenderer } from "./SwitchColumnRenderer";
import { TagColumnRenderer } from "./TagColumnRenderer";
import { TextColumnRenderer } from "./TextColumnRenderer";

export default {
  title: "Visualizations/Table/Table Renderers",
};

export const AllColumnRenderersStory: StoryObj = {
  render: () => <AllColumnRenderers />,
};

export const TextColumnRendererStory: StoryObj = {
  render: () => <TextColumnRenderer />,
};

export const NumberColumnRendererStory: StoryObj = {
  render: () => <NumberColumnRenderer />,
};

export const DateColumnRendererStory: StoryObj = {
  render: () => <DateColumnRenderer />,
};

export const ExpandColumnRendererStory: StoryObj = {
  render: () => <ExpandColumnRenderer />,
};

export const SwitchColumnRendererStory: StoryObj = {
  render: () => <SwitchColumnRenderer />,
};

export const TagColumnRendererStory: StoryObj = {
  render: () => <TagColumnRenderer />,
};

export const ProgressColumnRendererStory: StoryObj = {
  render: () => <ProgressColumnRenderer />,
};

export const DropdownColumnRendererStory: StoryObj = {
  render: () => <DropdownColumnRenderer />,
};
