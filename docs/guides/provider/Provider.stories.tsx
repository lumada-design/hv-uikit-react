import { Meta, StoryObj } from "@storybook/react";
import {
  ds3,
  ds5,
  HvContainer,
  HvInput,
  HvProvider,
  HvProviderProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Guides/Provider",
  component: HvProvider,
} satisfies Meta<typeof HvProvider>;

const ProviderSample = ({ label }: { label: string }) => (
  <HvContainer style={{ padding: theme.space.sm }}>
    <HvInput style={{ maxWidth: 120 }} label={label} />
  </HvContainer>
);

export const Main: StoryObj<HvProviderProps> = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div id="hv-root-ds5-dawn-docs-provider">
          <HvProvider
            classNameKey="hv-root-ds-five-dawn-docs-provider"
            rootElementId="hv-root-ds5-dawn-docs-provider"
            cssTheme="scoped"
            colorMode="dawn"
          >
            <ProviderSample label="DS5 Dawn" />
          </HvProvider>
        </div>
        <div id="hv-root-ds5-wicked-docs-provider">
          <HvProvider
            classNameKey="hv-root-ds-five-wicked-docs-provider"
            rootElementId="hv-root-ds5-wicked-docs-provider"
            cssTheme="scoped"
            colorMode="wicked"
          >
            <ProviderSample label="DS5 Wicked" />
          </HvProvider>
        </div>
        <div id="hv-root-ds3-dawn-docs-provider">
          <HvProvider
            classNameKey="hv-root-ds-three-dawn-docs-provider"
            rootElementId="hv-root-ds3-dawn-docs-provider"
            cssTheme="scoped"
            themes={[ds3]}
            colorMode="dawn"
          >
            <ProviderSample label="DS3 Dawn" />
          </HvProvider>
        </div>
        <div id="hv-root-ds3-wicked-docs-provider">
          <HvProvider
            classNameKey="hv-root-ds-three-wicked-docs-provider"
            rootElementId="hv-root-ds3-wicked-docs-provider"
            cssTheme="scoped"
            themes={[ds3]}
            colorMode="wicked"
          >
            <ProviderSample label="DS3 Wicked" />
          </HvProvider>
        </div>
      </div>
    );
  },
};

export const Test: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { disable: true },
  },

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
