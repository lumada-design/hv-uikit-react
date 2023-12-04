import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses, staticClasses } = createClasses(
  "HvQueryBuilder-NumericValue",
  {
    root: {},
    label: {
      paddingBottom: "6px",
    },
    inputContainer: {},
    rangeContainer: {
      display: "flex",

      "& $inputContainer": {
        flexGrow: 1,
        overflow: "auto",
      },

      "& > $inputContainer:not(:last-child)": {
        marginRight: theme.space.md,
      },
    },
    input: {
      flexGrow: 1,
    },
    isMdDown: {
      "& > $inputContainer:not(:last-child)": {
        marginRight: `calc(${theme.space.md} / 2)`,
      },
    },
  }
);
