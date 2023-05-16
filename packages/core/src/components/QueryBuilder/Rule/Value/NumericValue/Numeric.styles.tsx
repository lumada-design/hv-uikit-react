import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import numericValueClasses, {
  HvNumericValueClasses,
} from "./numericValueClasses";

export const styles: Partial<
  Record<keyof HvNumericValueClasses, CSSInterpolation>
> = {
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
