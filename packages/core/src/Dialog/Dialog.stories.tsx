import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import isChromatic from "chromatic/isChromatic";
import {
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogProps,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";

import { FormStory } from "./stories/FormStory";
import FormStoryRaw from "./stories/FormStory?raw";
import { LongContentStory } from "./stories/LongContentStory";
import LongContentStoryRaw from "./stories/LongContentStory?raw";
import { MainStory } from "./stories/MainStory";
import MainStoryRaw from "./stories/MainStory?raw";
import { SemanticVariantsStory } from "./stories/SemanticVariantsStory";
import SemanticVariantsStoryRaw from "./stories/SemanticVariantsStory?raw";

const meta: Meta<typeof HvDialog> = {
  title: "Components/Dialog",
  component: HvDialog,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvDialogTitle, HvDialogContent, HvDialogActions },
  decorators: [
    (Story) => (
      <div style={{ minHeight: isChromatic() ? 768 : 250 }}>{Story()}</div>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvDialogProps> = {
  args: {
    fullscreen: false,
    disableBackdropClick: false,
    buttonTitle: "Close",
    maxWidth: "sm",
    fullWidth: false,
  },
  argTypes: {
    maxWidth: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: { code: MainStoryRaw },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(button);
  },
  render: (args) => <MainStory {...args} />,
};

export const SemanticVariants: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      source: { code: SemanticVariantsStoryRaw },
      description: {
        story:
          "The `HvDialog` component can receive a `variant` prop to set the status of the dialog. `HvDialogTitle` also accepts a `variant` prop that changes the icon. Alternatively, the `customIcon` prop allows for any custom icon",
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          display: "flex",
          flexFlow: "column",
          gap: 20,
          minHeight: isChromatic() ? 768 : undefined,
        })}
      >
        {Story()}
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /success/i });
    await userEvent.click(button);
  },
  render: () => <SemanticVariantsStory />,
};

export const Form: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      source: { code: FormStoryRaw },
      description: {
        story:
          "An example of using a `form` in `HvDialog`. The sample uses the `autofocus` attribute to focus the Title input by default.<br /> \
          Accessibility-wise, `HvDialogTitle` automatically labels the dialog. A `aria-describedby` can be used to describe the content.",
      },
    },
  },
  decorators: [(Story) => <div style={{ minHeight: 440 }}>{Story()}</div>],
  render: () => <FormStory />,
};

export const LongContent: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      source: { code: LongContentStoryRaw },
      description: {
        story:
          "With very long content the dialog grows in height, up to a maximum where a margin of 100px is left on top and bottom.",
      },
    },
  },
  decorators: [(Story) => <div style={{ minHeight: 400 }}>{Story()}</div>],
  render: () => <LongContentStory />,
};
