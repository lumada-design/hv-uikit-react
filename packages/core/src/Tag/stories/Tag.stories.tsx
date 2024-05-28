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
    onClick: () => console.log("click"),
    onDelete: () => console.log("delete"),
    type: "semantic",
    color: "neutralDimmed",
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

export const Semantical: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <>
        <HvTag label="Informational" />
        <HvTag color="successDimmed" label="Success" />
        <HvTag color="errorDimmed" label="Warning" />
        <HvTag color="warningDimmed" label="Error" />
      </>
    );
  },
};

export const Categorical: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <>
        <HvTag label="Feat" onClick={() => alert("Hello")} type="categorical" />
        <HvTag
          label="Docs"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat2"
        />
        <HvTag
          label="Fix"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat3"
        />
        <HvTag
          label="New"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat4"
        />
        <HvTag
          label="Deprecated"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat5"
        />
        <HvTag label="No Click" type="categorical" color="#22FF45" />
      </>
    );
  },
};

export const DisabledTags: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <>
        <HvTag label="Informational" disabled />
        <HvTag
          label="Success"
          disabled
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
      </>
    );
  },
};

export const WithDeleteAction: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <>
        <HvTag
          label="Informational"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <HvTag
          label="Success"
          color="successDimmed"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <HvTag
          label="Warning"
          color="errorDimmed"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <HvTag
          label="Error"
          color="warningDimmed"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
      </>
    );
  },
};

export const CategoricalTagsDisabled: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <>
        <HvTag
          label="Feat"
          onClick={() => alert("Hello")}
          type="categorical"
          disabled
        />
        <HvTag
          label="Docs"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat2"
          disabled
        />
        <HvTag
          label="Fix"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat3"
          disabled
        />
        <HvTag
          label="New"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat4"
          disabled
        />
        <HvTag
          label="Deprecated"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cat5"
          disabled
        />
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
      <HvTag color="successDimmed" label="Success" />
      <HvTag color="errorDimmed" label="Warning" />
      <HvTag color="warningDimmed" label="Error" />
      <HvTag
        label="Success"
        color="successDimmed"
        onDelete={() => {
          alert("On Delete Action");
        }}
      />
      <HvTag label="Feat" type="categorical" />
      <HvTag label="Feat" type="categorical" disabled />
      <HvTag label="Docs" type="categorical" color="cat2" />
      <HvTag label="Asset 1" selectable color="cat1" />
      <HvTag
        label="Asset 2"
        selectable
        selected
        color="error"
        classes={{ root: css({ color: theme.colors.errorDimmed }) }}
      />
    </div>
  ),
};
