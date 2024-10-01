import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvOverflowTooltip,
  HvTag,
  HvTagProps,
  theme,
} from "@hitachivantara/uikit-react-core";

import { Selectable as SelectableStory } from "./Selectable";
import SelectableRaw from "./Selectable?raw";
import { SelectableControlled as SelectableControlledStory } from "./SelectableControlled";
import SelectableControlledRaw from "./SelectableControlled?raw";

const meta: Meta<typeof HvTag> = {
  title: "Components/Tag/Tag",
  component: HvTag,
  decorators: [
    (Story) => <div style={{ display: "flex", gap: 20 }}>{Story()}</div>,
  ],
};
export default meta;

export const Main: StoryObj<HvTagProps> = {
  args: {
    label: "Tag Label",
    type: "semantic",
    color: "neutral_20",
    disabled: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    deleteIcon: { control: { disable: true } },
    deleteButtonProps: { control: { disable: true } },
    type: { control: { type: "radio" }, options: ["semantic", "categorical"] },
  },
  render: (args) => {
    return <HvTag {...args} />;
  },
};

export const Variants: StoryObj<HvTagProps> = {
  decorators: [
    (Story) => <div className="grid grid-cols-6 gap-sm">{Story()}</div>,
  ],
  render: () => {
    return (
      <>
        <HvTag label="Informational" />
        <HvTag label="Success" color="positive_20" />
        <HvTag label="Warning" color="negative_20" />
        <HvTag label="Error" color="warning_20" />
        <HvTag label="Custom" color="#22FF45" />
        <HvTag label="Disabled" disabled />
        <HvTag label="Categorical" type="categorical" />
        <HvTag label="Docs" type="categorical" color="cat2" />
        <HvTag label="Fix" type="categorical" color="cat3" />
        <HvTag label="Deprecated" type="categorical" color="cat5" />
        <HvTag label="Custom" type="categorical" color="#22FF45" />
        <HvTag label="Disabled" type="categorical" disabled />
      </>
    );
  },
};

export const LongLabelText: StoryObj<HvTagProps> = {
  render: () => {
    const longText = "This is an example of a extremely long tag";

    return (
      <>
        <HvTag label={<HvOverflowTooltip data={longText} />} />
        <HvTag label={`${longText} with default overflow`} />
      </>
    );
  },
};

export const WithActions: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <>
        <HvTag label="Click me!" onClick={() => alert("Clicked!")} />
        <HvTag label="Delete me!" onDelete={() => alert("Deleted!")} />
      </>
    );
  },
};

export const Selectable: StoryObj<HvTagProps> = {
  parameters: {
    docs: {
      description: {
        story: "To have selectable `tags` set the `selectable` prop to `true`",
      },
      source: {
        code: SelectableRaw,
      },
    },
  },
  render: () => <SelectableStory />,
};

export const SelectableControlled: StoryObj<HvTagProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "To use the selectable tags in a controlled way, set the `selected` prop to `true` of `false",
      },
      source: {
        code: SelectableControlledRaw,
      },
    },
  },
  render: () => <SelectableControlledStory />,
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <HvTag label="Informational" />
      <HvTag label="Informational" disabled />
      <HvTag label="This is a very very very very very very very very long text for a tag" />
      <HvTag color="positive_20" label="Success" />
      <HvTag color="negative_20" label="Warning" />
      <HvTag color="warning_20" label="Error" />
      <HvTag label="Success" color="positive_20" onDelete={() => {}} />
      <HvTag label="Feat" type="categorical" />
      <HvTag label="Feat" type="categorical" disabled />
      <HvTag label="Docs" type="categorical" color="cat2" />
      <HvTag label="Asset 1" selectable color="cat1" />
      <HvTag
        label="Asset 2"
        selectable
        selected
        color="negative"
        classes={{ root: css({ color: theme.colors.negative_20 }) }}
      />
    </div>
  ),
};
