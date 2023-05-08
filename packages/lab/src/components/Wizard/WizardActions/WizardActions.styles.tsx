import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles: {
  buttonWidth: CSSInterpolation;
  actionsContainer: CSSInterpolation;
  buttonsContainer: CSSInterpolation;
  buttonSpacing: CSSInterpolation;
} = {
  buttonWidth: {
    width: 120,
    "& span": {
      whiteSpace: "normal",
      lineHeight: theme.lineHeights.sm,
    },
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    "& > button:last-child": {
      marginLeft: 20,
    },
  },
  buttonSpacing: {
    paddingLeft: 28,
  },
};
