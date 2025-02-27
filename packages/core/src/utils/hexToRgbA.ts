import { alpha, hexToRgb } from "@mui/material/styles";

/** @deprecated use `theme.alpha(color, factor)` instead */
export const hexToRgbA = (hex: string, factor = 0.8) =>
  alpha(hexToRgb(hex), factor);
