import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses, staticClasses } = createClasses(
  "HvQueryBuilder-DateTimeValue",
  {
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
      },
    },
    isMdDown: {
      "& > div:not(:last-child)": {
        marginRight: `calc(${theme.space.md} / 2)`,
      },
    },
    datePicker: {
      flex: "0 1 300px",
    },
    timePicker: {
      flex: "0 1 220px",
    },
  }
);
