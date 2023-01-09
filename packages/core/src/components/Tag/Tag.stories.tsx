import { Meta, StoryObj } from "@storybook/react";
import { HvTag, HvTagProps } from "components";

const meta: Meta<typeof HvTag> = {
  title: "Display/Tag",
  component: HvTag,
};
export default meta;

export const Main: StoryObj<HvTagProps> = {
  args: {
    label: "Tag Label",
    onDelete: () => console.log("delete"),
    type: "semantic",
    color: "sema7",
  },
  argTypes: {
    classes: { control: { disable: true } },
    type: { control: { type: "radio", options: ["semantic", "categorical"] } },
  },
  render: (args) => {
    return <HvTag {...args} />;
  },
};

export const Semantical: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HvTag label="Informational" />
        <HvTag color="sema8" label="Success" />
        <HvTag color="sema9" label="Warning" />
        <HvTag color="sema20" label="Error" />
      </div>
    );
  },
};

export const Categorial: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HvTag label="Feat" onClick={() => alert("Hello")} type="categorical" />
        <HvTag
          label="Docs"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz2"
        />
        <HvTag
          label="Fix"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz3"
        />
        <HvTag
          label="New"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz4"
        />
        <HvTag
          label="Deprecated"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz5"
        />
        <HvTag label="No Click" type="categorical" color="#22FF45" />
      </div>
    );
  },
};

export const DisabledTags: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "350px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HvTag
          label="Informational"
          disabled
          deleteButtonProps={{ "aria-label": "Disabled tag" }}
        />
        <HvTag
          label="Success"
          disabled
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{ "aria-label": "Disabled tag" }}
        />
      </div>
    );
  },
};

export const WithDeleteAction: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HvTag
          label="Informational"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <HvTag
          label="Success"
          color="sema8"
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{
            tabIndex: -1, // tab navigation should skip this tag
          }}
        />
        <HvTag
          label="Warning"
          color="sema9"
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{
            tabIndex: -1, // tab navigation should skip this tag
          }}
        />
        <HvTag
          label="Error"
          color="sema20"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
      </div>
    );
  },
};

export const CategoricalTagsDisabled: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "350px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          color="cviz2"
          disabled
        />
        <HvTag
          label="Fix"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz3"
          disabled
        />
        <HvTag
          label="New"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz4"
          disabled
        />
        <HvTag
          label="Deprecated"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz5"
          disabled
        />
      </div>
    );
  },
};
