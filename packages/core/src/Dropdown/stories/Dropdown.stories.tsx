import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  HvBaseDropdown,
  HvBaseDropdownProps,
  HvDropdown,
  HvDropdownProps,
} from "@hitachivantara/uikit-react-core";

import { CustomDropdown as CustomDropdownStory } from "./CustomDropdown";
import CustomDropdownRaw from "./CustomDropdown?raw";
import { MultiSelection as MultiSelectionStory } from "./MultiSelection";
import MultiSelectionRaw from "./MultiSelection?raw";
import { Variants as VariantsStory } from "./Variants";
import VariantsRaw from "./Variants?raw";
import { Virtualized as VirtualizedStory } from "./Virtualized";
import VirtualizedRaw from "./Virtualized?raw";
import { WithIcons as WithIconsStory } from "./WithIcons";
import WithIconsRaw from "./WithIcons?raw";

const widthDecorator: Decorator = (Story) => (
  <div style={{ minHeight: 120, width: 310 }}>{Story()}</div>
);

export default {
  title: "Components/Dropdown",
  component: HvDropdown,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: { HvBaseDropdown },
} satisfies Meta<typeof HvDropdown>;

export const Main: StoryObj<HvDropdownProps> = {
  args: {
    multiSelect: false,
    showSearch: false,
    disabled: false,
    readOnly: false,
    required: false,
    singleSelectionToggle: false,
    status: "valid",
  },
  argTypes: {
    classes: { control: { disable: true } },
    label: { control: { disable: true } },
    popperProps: { control: { disable: true } },
  },
  decorators: [
    widthDecorator,
    (Story) => <div style={{ minHeight: 400 }}>{Story()}</div>,
  ],
  render: (args) => (
    <HvDropdown
      {...args}
      label="Select values"
      values={[
        { label: "value 1" },
        { label: "value 2", selected: true },
        { label: "value 3" },
        { label: "value 4" },
      ]}
    />
  ),
};

export const Variants: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown in their various form state variants.",
      },
      source: {
        code: VariantsRaw,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          display: "flex",
          flexFlow: "row wrap",
          gap: 16,
          "& > *": {
            width: 200,
          },
        })}
      >
        {Story()}
      </div>
    ),
  ],
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox", { name: /required/i });
    await userEvent.click(picker);
    await expect(canvas.getByRole("listbox")).toBeInTheDocument();
  },
  render: () => <VariantsStory />,
};

export const WithIcons: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Single selection Dropdown with icons along with labels",
      },
      source: {
        code: WithIconsRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <WithIconsStory />,
};

export const MultiSelection: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown example with multiple selection (`multiSelect`) and search (`showSearch`). <br />\
          The Dropdown automatically expands to fit the available height. this can be configured using the `height` (or `maxHeight`) props.",
      },
      source: {
        code: MultiSelectionRaw,
      },
    },
  },
  decorators: [widthDecorator],
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox");
    await userEvent.click(picker);
    await expect(canvas.getByRole("list")).toBeInTheDocument();
  },
  render: (args) => <MultiSelectionStory {...args} />,
};

export const Virtualized: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Experimental Dropdown with virtualized list, which handles performance in lists with a lot of options. Note: only validated in the single selection use-case.",
      },
      source: {
        code: VirtualizedRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <VirtualizedStory />,
};

export const CustomDropdown: StoryObj<HvBaseDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can also use the `HvBaseDropdown` component to create your own dropdown components. This component can be leveraged to create similar dropdown components to the ones we provide, or you can use the `component` prop to add it to any component of your choosing.",
      },
      source: {
        code: CustomDropdownRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <CustomDropdownStory />,
};
