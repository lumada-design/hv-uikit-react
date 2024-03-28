import { Meta, StoryObj } from "@storybook/react";
import {
  HvProvider,
  HvProviderProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { ds3, ds5 } from "@hitachivantara/uikit-styles";

const meta: Meta<typeof HvProvider> = {
  title: "Tests/Provider",
  component: HvProvider,
};

export default meta;

export const Main: StoryObj<HvProviderProps> = {
  args: {},
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
