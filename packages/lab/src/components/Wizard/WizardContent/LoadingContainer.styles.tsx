import { CSSInterpolation } from "@emotion/serialize";
import { hexToRgbA, theme } from "@hitachivantara/uikit-react-core";
import { alpha } from "@mui/material";

export const styles: {
  loading: CSSInterpolation;
  overlay: CSSInterpolation;
  blur: CSSInterpolation;
} = {
  loading: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    transition: "background-Color .2s ease",
    zIndex: -1,
  },
  blur: {
    backgroundColor: alpha(hexToRgbA(theme.colors.atmo2), 0.8),
    zIndex: theme.zIndices.modal,
  },
};
