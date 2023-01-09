import { Meta, StoryObj } from "@storybook/react";
import { Tag, TagProps } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Display/Tag",
  component: Tag,
};
export default meta;

export const Main: StoryObj<TagProps> = {
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
    return <Tag {...args} />;
  },
};

export const Semantical: StoryObj<TagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tag label="Informational" />
        <Tag color="sema8" label="Success" />
        <Tag color="sema9" label="Warning" />
        <Tag color="sema20" label="Error" />
      </div>
    );
  },
};

export const Categorial: StoryObj<TagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tag label="Feat" onClick={() => alert("Hello")} type="categorical" />
        <Tag
          label="Docs"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz2"
        />
        <Tag
          label="Fix"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz3"
        />
        <Tag
          label="New"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz4"
        />
        <Tag
          label="Deprecated"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz5"
        />
        <Tag label="No Click" type="categorical" color="#22FF45" />
      </div>
    );
  },
};

export const DisabledTags: StoryObj<TagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "350px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tag
          label="Informational"
          disabled
          deleteButtonProps={{ "aria-label": "Disabled tag" }}
        />
        <Tag
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

export const WithDeleteAction: StoryObj<TagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tag
          label="Informational"
          onDelete={() => {
            alert("On Delete Action");
          }}
        />
        <Tag
          label="Success"
          color="sema8"
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{
            tabIndex: -1, // tab navigation should skip this tag
          }}
        />
        <Tag
          label="Warning"
          color="sema9"
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{
            tabIndex: -1, // tab navigation should skip this tag
          }}
        />
        <Tag
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

export const CategoricalTagsDisabled: StoryObj<TagProps> = {
  render: () => {
    return (
      <div
        style={{
          width: "350px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tag
          label="Feat"
          onClick={() => alert("Hello")}
          type="categorical"
          disabled
        />
        <Tag
          label="Docs"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz2"
          disabled
        />
        <Tag
          label="Fix"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz3"
          disabled
        />
        <Tag
          label="New"
          onClick={() => alert("Hello")}
          type="categorical"
          color="cviz4"
          disabled
        />
        <Tag
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
