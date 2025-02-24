import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSliderInput", {
  root: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semibold,
  },
  input: { maxWidth: "50px" },
});
