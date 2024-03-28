import { alpha, hexToRgb } from "@mui/material/styles";

// TODO - remove in v6 in favor of theme.alpha()
export const hexToRgbA = (hex: string, factor = 0.8) =>
  alpha(hexToRgb(hex), factor);
