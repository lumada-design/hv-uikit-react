import { theme } from "@hitachivantara/uikit-styles";
import { useMediaQuery } from "@mui/material";

export const useWidth = () => {
  const keys = Object.keys(theme.breakpoints.values).reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, "") || "xs"
  );
};
