import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvListContainer,
  HvListItem,
  HvOverflowTooltip,
  HvTag,
  HvTagProps,
} from "~/components";

// #region styled components

const StyledListContainer = styled(HvListContainer)({
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  maxWidth: 350,
});

const StyledListItem = styled(HvListItem)({
  padding: 0,
  paddingRight: theme.space.xs,
  paddingBottom: theme.space.xs,
  height: "auto",
  lineHeight: "16px",
});

// #endregion

const meta: Meta<typeof HvTag> = {
  title: "Components/Tag/Tag",
  component: HvTag,
};
export default meta;

export const Main: StoryObj<HvTagProps> = {
  args: {
    label: "Tag Label",
    onDelete: () => console.log("delete"),
    type: "semantic",
    color: "neutral_20",
    disabled: false,
    clickable: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    children: { control: { disable: true } },
    sx: { control: { disable: true } },
    icon: { control: { disable: true } },
    deleteIcon: { control: { disable: true } },
    deleteButtonProps: { control: { disable: true } },
    type: { control: { type: "radio", options: ["semantic", "categorical"] } },
  },
  render: (args) => {
    return <HvTag {...args} />;
  },
};

export const LongLabelText: StoryObj<HvTagProps> = {
  render: () => {
    const longText = "This is an example of a very long tag";

    return (
      <div style={{ display: "flex", gap: 20 }}>
        <HvTag label={<HvOverflowTooltip data={longText} />} />
        <HvTag label={`${longText} with default overflow`} />
      </div>
    );
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
        <HvTag color="positive_20" label="Success" />
        <HvTag color="negative_20" label="Warning" />
        <HvTag color="warning_20" label="Error" />
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
          color="positive_20"
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{
            tabIndex: -1, // tab navigation should skip this tag
          }}
        />
        <HvTag
          label="Warning"
          color="negative_20"
          onDelete={() => {
            alert("On Delete Action");
          }}
          deleteButtonProps={{
            tabIndex: -1, // tab navigation should skip this tag
          }}
        />
        <HvTag
          label="Error"
          color="warning_20"
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
      </div>
    );
  },
};

export const TagArray: StoryObj<HvTagProps> = {
  render: () => {
    return (
      <StyledListContainer condensed role="list">
        <StyledListItem>
          <HvTag label="In progress" />
        </StyledListItem>
        <StyledListItem>
          <HvTag label="To Do" />
        </StyledListItem>
        <StyledListItem>
          <HvTag label="New" />
        </StyledListItem>
        <StyledListItem>
          <HvTag label="Success" />
        </StyledListItem>
        <StyledListItem>
          <HvTag label="Fixed" />
        </StyledListItem>
        <StyledListItem>
          <HvTag label="Completed" />
        </StyledListItem>
      </StyledListContainer>
    );
  },
};
