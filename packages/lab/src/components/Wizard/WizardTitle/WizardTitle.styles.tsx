import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvWizardTitleClasses } from "./wizardTitleClasses";

export const styles: Partial<
  Record<keyof HvWizardTitleClasses, CSSInterpolation>
> = {
  messageContainer: {
    "& > div": {
      width: "100%",
    },
  },
  titleContainer: {
    margin: 0,
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
};
