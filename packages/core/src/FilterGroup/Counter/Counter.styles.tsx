import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const name = "HvFilterGroupCounter";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    lineHeight: "34px",
    marginRight: 10,
  },
  partialCounter: {
    display: "inline-block",
    fontWeight: theme.fontWeights.normal,
  },
});
