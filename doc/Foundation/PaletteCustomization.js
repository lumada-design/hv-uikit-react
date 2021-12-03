import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { HvProvider, HvButton } from "@hv/uikit-react-core";

const theme = createTheme({
  hv: {
    palette: {
      accent: {
        acce2: "red",
      },
      atmosphere: {
        atmo1: "cyan",
      },
    },
  },
});

const Palette = () => {
  return (
    <HvProvider theme={theme}>
      <HvButton category="primary">Primary</HvButton>
      <HvButton category="secondary">Secondary</HvButton>
    </HvProvider>
  );
};

export default Palette;
