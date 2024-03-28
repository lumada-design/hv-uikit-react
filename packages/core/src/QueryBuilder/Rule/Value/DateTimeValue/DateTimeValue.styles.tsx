import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../../../utils/classes";

export const { useClasses, staticClasses } = createClasses(
  "HvQueryBuilder-DateTimeValue",
  {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    row: {},
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
      flex: 1,
    },
    timePicker: {
      flex: 1,
    },
  },
);
