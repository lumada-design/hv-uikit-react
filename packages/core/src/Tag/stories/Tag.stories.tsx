import { Meta, StoryObj } from "@storybook/react";
import {
  HvOverflowTooltip,
  HvTag,
  HvTagProps,
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
        <HvTag color="positive_20" label="Success" />
        <HvTag color="negative_20" label="Warning" />
        <HvTag color="warning_20" label="Error" />
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
          color="positive_20"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <HvTag
          label="Warning"
          color="negative_20"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <HvTag
          label="Error"
          color="warning_20"
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
