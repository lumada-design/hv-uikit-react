import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvWizardTitle", {
  messageContainer: {
    "& > div": {
      width: "100%",
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(1),
    width: "100%",
  },
  buttonWidth: {
    width: 120,
  },
  rootSummaryButton: {
    paddingRight: 18,
  },
  headerContainer: {
    backgroundColor: theme.colors.atmo2,
    "& h6": {
      fontSize: "16px",
      fontWeight: "bold",
      letterSpacing: 0,
    },
  },
  stepContainer: {
    margin: "auto",
  },
});
