import { hexToRgb, alpha } from "@mui/material";

export const hexToRgbA = (hex, factor = 0.8) => alpha(hexToRgb(hex), factor);
