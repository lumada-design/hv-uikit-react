import { HvColorPicker } from "@hitachivantara/uikit-react-core";
import { StoryObj } from "@storybook/react";

export default {
  title: "Tests/Color Picker",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 5 }}>
      <div style={{ width: 268 }}>
        <HvColorPicker label="Color" defaultExpanded />
      </div>
      <div style={{ width: 268 }}>
        <HvColorPicker
          label="Color"
          showSavedColors={false}
          defaultValue="#C62828"
          defaultExpanded
        />
      </div>
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          showSavedColors={false}
          showCustomColors={false}
          defaultValue="#F6941E"
          defaultExpanded
        />
      </div>
      <div style={{ marginLeft: 130 }}>
        <HvColorPicker label="Color" iconOnly />
      </div>
      <HvColorPicker label="Color" iconOnly defaultValue="#59941B" />
    </div>
  ),
};
