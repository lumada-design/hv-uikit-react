import { createContext } from "react";

const WizardContext = createContext({
  context: {},
  setContext: () => {},
});

if (process.env.NODE_ENV !== "production") {
  WizardContext.displayName = "WizardContext";
}

export default WizardContext;
