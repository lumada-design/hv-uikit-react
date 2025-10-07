import type { Meta, StoryObj } from "@storybook/react-vite";
import { setupChromatic } from "@hitachivantara/internal";
import {
  HvCodeEditor,
  HvCodeEditorProps,
} from "@hitachivantara/uikit-react-code-editor";

import { MainStory, OfflineStory } from "./stories/Main";

const meta: Meta<typeof HvCodeEditor> = {
  title: "Components/Code Editor",
  component: HvCodeEditor,
};
export default meta;

export const Main: StoryObj<HvCodeEditorProps> = {
  parameters: {
    ...setupChromatic(["DS5 dawn"], 5000),
  },
  render: () => <MainStory />,
};

export const Offline: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Monaco Editor configured for offline use. This example shows how to configure Monaco to work offline by calling `configureMonacoOffline()` before using the editor.",
      },
    },
  },
  render: () => <OfflineStory />,
};
