import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvWizardContainerClasses } from "./wizardContainerClasses";

export const styles: Partial<
  Record<keyof HvWizardContainerClasses, CSSInterpolation>
> = {
  paper: {
    width: "80%",
    maxWidth: "80%",
    maxHeight: `calc(100% - (2 * ${theme.dialog.margin}))`,
  },
  closeButton: {
    display: "none",
  },
};
