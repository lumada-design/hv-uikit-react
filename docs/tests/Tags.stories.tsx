import { css } from "@emotion/css";
import { HvTag, theme } from "@hitachivantara/uikit-react-core";
import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

export default {
  title: "Tests/Tags",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /asset 2/i });
    await userEvent.click(button);
  },
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <HvTag label="Informational" />
      <HvTag label="Informational" disabled />
      <HvTag label="This is a very very very very very very very very long text for a tag" />
      <HvTag color="positive_20" label="Success" />
      <HvTag color="negative_20" label="Warning" />
      <HvTag color="warning_20" label="Error" />
      <HvTag
        label="Success"
        color="positive_20"
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
        color="negative"
        classes={{ root: css({ color: theme.colors.negative_20 }) }}
      />
    </div>
  ),
};
