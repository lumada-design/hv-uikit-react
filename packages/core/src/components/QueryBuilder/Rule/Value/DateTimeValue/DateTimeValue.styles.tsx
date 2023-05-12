import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvDateTimeValueClasses } from "./dateTimeValueClasses";

export const styles: Partial<
  Record<keyof HvDateTimeValueClasses, CSSInterpolation>
> = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    minHeight: 94,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
  },
  horizontal: {
    display: "flex",

    "& > div:not(:last-child)": {
      marginRight: theme.space.md,

      // [theme.breakpoints.down("md")]: {
      //   marginRight: theme.space.md / 2,
      // },
    },
  },
  datePicker: {
    flex: "0 1 320px",
  },
  timePicker: {
    flex: "0 1 200px",
  },
};
