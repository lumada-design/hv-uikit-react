/* eslint-disable react-hooks/rules-of-hooks */
import { theme } from "@hitachivantara/uikit-styles";
import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useWidth = () => {
  const muiTheme = useTheme();
  const keys = Object.keys(theme.breakpoints.values).reverse() as Breakpoint[];

  return (
    keys.reduce<Breakpoint | null>((output, key) => {
      const matches = useMediaQuery(muiTheme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || "xs"
  );
};
