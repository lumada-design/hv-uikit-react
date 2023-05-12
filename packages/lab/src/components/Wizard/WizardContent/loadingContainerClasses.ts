import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardLoadingContainerClasses = {
  loading?: string;
  overlay?: string;
  blur?: string;
};

const classKeys: (keyof HvWizardLoadingContainerClasses)[] = [
  "blur",
  "loading",
  "overlay",
];

const wizardLoadingContainerClasses =
  getClasses<HvWizardLoadingContainerClasses>(
    classKeys,
    "HvWizard-LoadingContainer"
  );

export default wizardLoadingContainerClasses;
