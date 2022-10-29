import React from "react";

export type HvWizardContextProps = {
  context: any;
  setContext: (values: any) => void;
};

declare const HvWizardContext: React.Context<HvWizardContextProps>;

export default HvWizardContext;
