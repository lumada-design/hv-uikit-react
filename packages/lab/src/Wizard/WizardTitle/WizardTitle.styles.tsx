import { createClasses } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvWizardTitle", {
  root: {
    backgroundColor: theme.colors.atmo2,
    justifyContent: "space-between",
    paddingRight: theme.space.sm,
  },
  summaryButton: {},
  stepContainer: {
    margin: "auto",
  },
});
