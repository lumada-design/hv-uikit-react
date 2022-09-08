import React from "react";

export type HvWizardContextClassKey = "root";

export type HvWizardContextProps = {
  context: any;
  setContext: () => void;
};

export default function HvWizardContext(
  props: HvWizardContextProps
): React.Context<HvWizardContextProps>;
