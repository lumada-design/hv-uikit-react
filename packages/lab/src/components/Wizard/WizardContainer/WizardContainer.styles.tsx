import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles: {
  paper: CSSInterpolation;
  closeButton: CSSInterpolation;
} = {
  paper: {
    width: "80%",
    maxWidth: "80%",
    maxHeight: `calc(100% - (2 * ${theme.dialog.margin}))`,
  },
  closeButton: {
    display: "none",
  },
};
