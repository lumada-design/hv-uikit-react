import { CSSInterpolation } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import numericValueClasses from "./numericValueClasses";

export const styles: { [key: string]: CSSInterpolation } = {
  root: {
    display: "flex",
    flexGrow: 1,
  },
  label: {
    paddingBottom: "6px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "baseline",
    flexGrow: 1,
  },
  rangeContainer: {
    display: "flex",
    flexGrow: 1,

    [`& > .${numericValueClasses.inputContainer}:not(:last-child)`]: {
      marginRight: theme.space.md,
    },
  },
  input: {
    flexGrow: 1,
  },
  isMdDown: {
    [`& > .${numericValueClasses.inputContainer}:not(:last-child)`]: {
      marginRight: `calc(${theme.space.md} / 2)`,
    },
  },
};
