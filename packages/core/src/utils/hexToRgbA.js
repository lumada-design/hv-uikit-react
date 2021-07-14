import { hexToRgb } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";

const hexToRgbA = (hex, factor = 0.8) => alpha(hexToRgb(hex), factor);

export default hexToRgbA;
