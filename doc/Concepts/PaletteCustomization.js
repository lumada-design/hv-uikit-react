import React from "react";
import { createTheme } from "@mui/material";
import { HvProvider, HvButton } from "@hitachivantara/uikit-react-core";

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
    <HvProvider theme={theme} disableCssBaseline>
      <HvButton category="primary">Primary</HvButton>
      <HvButton category="secondary">Secondary</HvButton>
    </HvProvider>
  );
};

export default Palette;
