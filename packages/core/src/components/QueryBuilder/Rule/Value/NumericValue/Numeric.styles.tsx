import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils";

export const { useClasses, staticClasses } = createClasses(
  "HvQueryBuilder-NumericValue",
  {
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

      [`& > .$inputContainer:not(:last-child)`]: {
        marginRight: theme.space.md,
      },
    },
    input: {
      flexGrow: 1,
    },
    isMdDown: {
      [`& > .$inputContainer:not(:last-child)`]: {
        marginRight: `calc(${theme.space.md} / 2)`,
      },
    },
  }
);
