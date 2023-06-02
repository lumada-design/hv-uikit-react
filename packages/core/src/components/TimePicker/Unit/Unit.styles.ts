import { CSSInterpolation } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

export const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    ...theme.typography.sTitle,
  },

  separator: {
    width: 8,
  },

  periodToggle: {
    height: 40,
    width: 40,
  },

  element: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },

  input: {
    ...theme.typography.sTitle,
    fontWeight: 600,
    textAlign: "center",
    height: 40,
    width: 40,
    padding: 0,
    margin: 0,
    "&::placeholder": {
      fontSize: 16,
      fontWeight: 600,
    },
  },
  inputRoot: {
    width: 40,
    height: 40,
  },

  subtractIcon: {
    marginTop: theme.space.xs,
  },
  inputContainer: {
    minWidth: 40,
    maxWidth: 40,
  },
  inputBorderContainer: {
    top: 40,
  },
} satisfies Record<string, CSSInterpolation>;
