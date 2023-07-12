import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvWizardActions", {
  buttonWidth: {
    width: 120,
    "& span": {
      whiteSpace: "normal",
      lineHeight: theme.lineHeights.sm,
    },
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    "& > button:last-child": {
      marginLeft: 20,
    },
  },
  buttonSpacing: {
    paddingLeft: 28,
  },
});
