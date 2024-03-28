import { Meta, StoryObj } from "@storybook/react";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import { ds3, ds5 } from "@hitachivantara/uikit-styles";

import { HvProvider, HvProviderProps } from "./Provider";

const meta: Meta<typeof HvProvider> = {
  title: "Providers/Provider",
  component: HvProvider,
};

export default meta;

export const Main: StoryObj<HvProviderProps> = {
  args: {},
  tags: ["test"],
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
