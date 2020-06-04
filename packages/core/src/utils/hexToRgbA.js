import { fade, hexToRgb } from "@material-ui/core";

const hexToRgbA = (hex, factor = 0.8) => fade(hexToRgb(hex), factor);

export default hexToRgbA;
