import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

export type HvWizardTab = {
  name?: string;
  valid?: boolean;
  mustValidate?: boolean;
  touched?: boolean;
  form?: any;
  children?: React.ReactNode;
};

export type HvWizardTabs<T extends HvWizardTab> = {
  [tab in number]?: T;
};

type HvWizardContextProp = {
  context: HvWizardTabs<HvWizardTab>;
  updateContext: (values?: HvWizardTabs<HvWizardTab>) => void;
  summary: any;
  setSummary: (oldSummary?: any) => void;
  tab: any;
  setTab: Dispatch<SetStateAction<number>>;
};

export const HvWizardContext = createContext<HvWizardContextProp>({
  context: {},
  updateContext: () => {},
  summary: undefined,
  setSummary: ({}) => {},
  tab: 0,
  setTab: () => {},
});

const WizardProvider = ({ children }) => {
  const [context, setContext] = useState({});
  const [summary, setSummary] = useState(undefined);
  const [tab, setTab] = useState(0);

  const updateContext = useCallback(
    (newContext) => {
      if (Object.entries(newContext).length > 0) {
        setContext(newContext);
      }
    },
    [setContext]
  );

  return (
    <HvWizardContext.Provider
      value={{
        context,
        updateContext,
        summary,
        setSummary,
        tab,
        setTab,
      }}
    >
      {children}
    </HvWizardContext.Provider>
  );
};

export default WizardProvider;
