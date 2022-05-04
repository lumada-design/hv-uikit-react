import { hexToRgb, alpha } from "@mui/material";

const hexToRgbA = (hex, factor = 0.8) => alpha(hexToRgb(hex), factor);

export default hexToRgbA;
