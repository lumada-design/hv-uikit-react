/* eslint-disable react-hooks/rules-of-hooks */
import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useWidth = () => {
  const muiTheme = useTheme();
  const breakpointOrder: Breakpoint[] = ["xl", "lg", "md", "sm", "xs"];

  return (
    breakpointOrder.reduce<Breakpoint | null>((output, key) => {
      const matches = useMediaQuery(muiTheme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || "xs"
  );
};
