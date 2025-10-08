import type { Meta, StoryObj } from "@storybook/react-vite";
import { setupChromatic } from "@hitachivantara/internal";
import {
  HvCodeEditor,
  HvCodeEditorProps,
} from "@hitachivantara/uikit-react-code-editor";

import { MainStory } from "./stories/Main";

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

export const CDNMode: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Example using CDN mode instead of offline mode. This can be useful when bundler compatibility issues arise or when you prefer to load Monaco from CDN.",
      },
    },
  },
  render: () => (
    <HvCodeEditor
      height={300}
      language="javascript"
      defaultValue="// Monaco Editor loaded from CDN
console.log('Hello, World!');"
    />
  ),
};
