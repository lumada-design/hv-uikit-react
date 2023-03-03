import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvProvider,
  HvCheckBox,
  HvProviderProps,
  // @ts-ignore
} from "@hitachivantara/uikit-react-core";
import styled from "@emotion/styled";

const meta: Meta<typeof HvProvider> = {
  title: "Theme/Provider",
  component: HvProvider,
};

export default meta;

export const Main: StoryObj<HvProviderProps> = {
  render: () => {
    const StyledContainer = styled("div")({
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      gap: "20px",
    });

    return (
      <StyledContainer>
        <div id="hv-root-ds5-dawn">
          <HvProvider
            rootElementId="hv-root-ds5-dawn"
            theme={{ baseTheme: "ds5", baseColorMode: "dawn" }}
          >
            <HvCheckBox label="DS5 Dawn" />
          </HvProvider>
        </div>
        <div id="hv-root-ds5-wicked">
          <HvProvider
            rootElementId="hv-root-ds5-wicked"
            theme={{ baseTheme: "ds5", baseColorMode: "wicked" }}
          >
            <HvCheckBox label="DS5 Wicked" />
          </HvProvider>
        </div>
        <div id="hv-root-ds3-dawn">
          <HvProvider
            rootElementId="hv-root-ds3-dawn"
            theme={{ baseTheme: "ds3", baseColorMode: "dawn" }}
          >
            <HvCheckBox label="DS3 Dawn" />
          </HvProvider>
        </div>
        <div id="hv-root-ds3-wicked">
          <HvProvider
            rootElementId="hv-root-ds3-wicked"
            theme={{ baseTheme: "ds3", baseColorMode: "wicked" }}
          >
            <HvCheckBox label="DS3 Wicked" />
          </HvProvider>
        </div>
      </StyledContainer>
    );
  },
};
