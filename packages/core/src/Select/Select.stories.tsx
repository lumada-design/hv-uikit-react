import { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  HvOption,
  HvOptionGroup,
  HvSelect,
  HvSelectProps,
} from "@hitachivantara/uikit-react-core";

import ControlledStory from "./stories/Controlled";
import ControlledStoryRaw from "./stories/Controlled?raw";
import FormStory from "./stories/Form";
import FormStoryRaw from "./stories/Form?raw";

const decorator: Decorator = (Story) => (
  <div className="w-[300px] min-h-[300px]">{Story()}</div>
);

export default {
  title: "Components/Select",
  component: HvSelect,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: { HvOption, HvOptionGroup },
} satisfies Meta<typeof HvSelect>;

export const Main: StoryObj<HvSelectProps<{}, false>> = {
  args: {
    multiple: false,
    size: "md",
    variant: "secondarySubtle",
  },
  decorators: [decorator],
  parameters: {
    a11y: {
      config: {
        rules: [
          // Axe isn't (incorrectly) identifying the ul <-> li hierarchy
          // on HvSelect with grouping (HvOptionGroup)
          { id: "list", enabled: false },
          { id: "listitem", enabled: false },
          { id: "aria-required-parent", enabled: false },
          { id: "aria-required-children", enabled: false },
        ],
      },
    },
  },
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /country/i });
    await userEvent.click(select);
    await expect(canvas.getAllByRole("option")).toHaveLength(6);
  },
  render: (args) => {
    return (
      <HvSelect
        required
        name="country"
        label="Country"
        description="Select your favorite country"
        placeholder="Select country"
        onChange={(evt, val) => console.log(val)}
        {...args}
      >
        <HvOptionGroup label="America">
          <HvOption value="ar">Argentina</HvOption>
          <HvOption value="us">United States</HvOption>
        </HvOptionGroup>
        <HvOptionGroup label="Europe">
          <HvOption value="bg">Belgium</HvOption>
          <HvOption value="pt">Portugal</HvOption>
          <HvOption value="pl">Poland</HvOption>
          <HvOption value="sp">Spain</HvOption>
        </HvOptionGroup>
      </HvSelect>
    );
  },
};

export const Variants: StoryObj<HvSelectProps<{}, false>> = {
  parameters: {
    docs: {
      description: {
        story: "Selects in their various form state variants.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-sm [&>*]:w-[200px]">{Story()}</div>
    ),
  ],
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /required/i });
    await userEvent.click(select);
    await expect(canvas.getAllByRole("option")).toHaveLength(2);
  },
  render: () => {
    return (
      <>
        <HvSelect required label="Required" placeholder="Select an option">
          <HvOption value="op1">Option 1</HvOption>
          <HvOption value="op2">Option 2</HvOption>
        </HvSelect>
        <HvSelect disabled label="Disabled" placeholder="Select an option">
          <HvOption value="op">Option</HvOption>
        </HvSelect>
        <HvSelect readOnly label="Read-only" placeholder="Select an option">
          <HvOption value="op">Option</HvOption>
        </HvSelect>
        <HvSelect
          status="invalid"
          label="Invalid"
          statusMessage="This is always invalid"
          placeholder="Select an option"
        >
          <HvOption value="op">Option</HvOption>
        </HvSelect>
      </>
    );
  },
};

export const Form: StoryObj<HvSelectProps<{}, false>> = {
  parameters: {
    docs: {
      source: { code: FormStoryRaw },
      description: {
        story:
          "To integrate `HvSelect` in a form, make sure you're giving it a `name`. <br />\
          The value result will be the selected option's `value`, or a JSON of the selected values when multi-select is enabled. The value can be customized via the `getSerializedValue` prop.",
      },
    },
  },
  decorators: [decorator],
  render: () => <FormStory />,
};

export const Controlled: StoryObj<HvSelectProps<{}, false>> = {
  parameters: {
    docs: {
      source: { code: ControlledStoryRaw },
      description: {
        story:
          "The value and open states of `HvSelect` can be controlled by using the `value`/`onChange` and `open`/`onOpenChange` props respectively.",
      },
    },
  },
  decorators: [
    (Story) => <div className="flex gap-sm min-h-[300px]">{Story()}</div>,
  ],
  render: () => <ControlledStory />,
};

export const Test: StoryObj<HvSelectProps<{}, false>> = {
  parameters: {
    docs: { disable: true },
    a11y: {
      config: {
        rules: [
          // Axe isn't (incorrectly) identifying the ul <-> li hierarchy
          // on HvSelect with grouping (HvOptionGroup)
          { id: "list", enabled: false },
          { id: "listitem", enabled: false },
          { id: "aria-required-parent", enabled: false },
          { id: "aria-required-children", enabled: false },
        ],
      },
    },
  },
  render: () => (
    <>
      <HvSelect disabled label="Disabled" placeholder="Select an option">
        <HvOption value="op">Option</HvOption>
      </HvSelect>
      <HvSelect readOnly label="Read-only" placeholder="Select an option">
        <HvOption value="op">Option</HvOption>
      </HvSelect>
      <HvSelect
        status="invalid"
        label="Invalid"
        statusMessage="This is always invalid"
        placeholder="Select an option"
      >
        <HvOption value="op">Option</HvOption>
      </HvSelect>
      <HvSelect
        open
        required
        label="Options"
        placeholder="Select one"
        description="Many options"
      >
        <HvOptionGroup label="Countries">
          <HvOption value="ar">Argentina</HvOption>
          <HvOption value="bg">Belgium</HvOption>
          <HvOption value="pt">Portugal</HvOption>
          <HvOption value="us">United States</HvOption>
        </HvOptionGroup>
        <HvOptionGroup label="More options">
          {[...Array(40).keys()].map((i) => (
            <HvOption key={i} value={i}>{`Option ${i}`}</HvOption>
          ))}
        </HvOptionGroup>
      </HvSelect>
    </>
  ),
};
