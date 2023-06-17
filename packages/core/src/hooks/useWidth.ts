/* eslint-disable react-hooks/rules-of-hooks */
import { theme } from "@hitachivantara/uikit-styles";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export const useWidth = () => {
  const muiTheme = useTheme();
  const keys = Object.keys(theme.breakpoints.values).reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(muiTheme.breakpoints.up(key as Breakpoint));

      return !output && matches ? key : output;
    }, "") || "xs"
  );
};
