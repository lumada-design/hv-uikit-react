import type { StoryObj } from "@storybook/react";
import { fireEvent, screen, waitFor } from "@storybook/testing-library";

import { AllColumnRenderers } from "./AllColumnRenderers";
import AllColumnRenderersRaw from "./AllColumnRenderers?raw";
import { DateColumnRenderer } from "./DateColumnRenderer";
import DateColumnRendererRaw from "./DateColumnRenderer?raw";
import { DropdownColumnRenderer } from "./DropdownColumnRenderer";
import DropdownColumnRendererRaw from "./DropdownColumnRenderer?raw";
import { ExpandColumnRenderer } from "./ExpandColumnRenderer";
import ExpandColumnRendererRaw from "./ExpandColumnRenderer?raw";
import { NumberColumnRenderer } from "./NumberColumnRenderer";
import NumberColumnRendererRaw from "./NumberColumnRenderer?raw";
import { ProgressColumnRenderer } from "./ProgressColumnRenderer";
import ProgressColumnRendererRaw from "./ProgressColumnRenderer?raw";
import { SwitchColumnRenderer } from "./SwitchColumnRenderer";
import SwitchColumnRendererRaw from "./SwitchColumnRenderer?raw";
import { TagColumnRenderer } from "./TagColumnRenderer";
import TagColumnRendererRaw from "./TagColumnRenderer?raw";
import { TextColumnRenderer } from "./TextColumnRenderer";
import TextColumnRendererRaw from "./TextColumnRenderer?raw";

export default {
  title: "Visualizations/Table/Table Renderers",
};

export const AllColumnRenderersStory: StoryObj = {
  parameters: { docs: { source: { code: AllColumnRenderersRaw } } },
  render: () => <AllColumnRenderers />,
};

export const TextColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: TextColumnRendererRaw } },
  },
  render: () => <TextColumnRenderer />,
};

export const NumberColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: NumberColumnRendererRaw } },
  },
  render: () => <NumberColumnRenderer />,
};

export const DateColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: DateColumnRendererRaw } },
  },
  render: () => <DateColumnRenderer />,
};

export const ExpandColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: ExpandColumnRendererRaw } },
  },
  render: () => <ExpandColumnRenderer />,
};

export const SwitchColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: SwitchColumnRendererRaw } },
  },
  render: () => <SwitchColumnRenderer />,
};

export const TagColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: TagColumnRendererRaw } },
  },
  render: () => <TagColumnRenderer />,
};

export const ProgressColumnRendererStory: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: { source: { code: ProgressColumnRendererRaw } },
  },
  render: () => <ProgressColumnRenderer />,
};

export const DropdownColumnRendererStory: StoryObj = {
  parameters: {
    eyes: {
      include: true,
      runBefore() {
        fireEvent.click(screen.getByText("Major"));

        return waitFor(() => screen.getByRole("listbox"));
      },
    },
    docs: { source: { code: DropdownColumnRendererRaw } },
  },
  render: () => <DropdownColumnRenderer />,
};
