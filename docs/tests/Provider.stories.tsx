import { StoryObj } from "@storybook/react";
import { HvProvider, HvTypography } from "@hitachivantara/uikit-react-core";
import { ds3, ds5 } from "@hitachivantara/uikit-styles";

export default {
  title: "Tests/Provider",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
};

export const Main: StoryObj = {
  render: () => {
    return (
      <HvProvider
        themes={[ds3, ds5]}
        theme="ds5"
        rootElementId="hv-root"
        cssTheme="scoped"
        cssBaseline="scoped"
      >
        <HvProvider
          themes={[ds3, ds5]}
          theme="ds5"
          rootElementId="hv-root"
          cssTheme="scoped"
          cssBaseline="scoped"
        >
          <HvTypography variant="display">Sample text</HvTypography>
        </HvProvider>
      </HvProvider>
    );
  },
};
