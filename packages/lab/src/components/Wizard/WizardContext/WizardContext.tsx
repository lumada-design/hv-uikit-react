import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

export type ContextProp = {
  valid?: boolean;
  mustValidate?: boolean;
  touched?: boolean;
  form?: any;
  children?: React.ReactNode;
};

type WizardContextProp = {
  context: ContextProp;
  updateContext: (values?: any) => void;
  summary: any;
  setSummary: (oldSummary?: any) => void;
  tab: any;
  setTab: Dispatch<SetStateAction<number>>;
};

export const WizardContext = createContext<WizardContextProp>({
  context: {},
  updateContext: ({}) => {},
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
    <WizardContext.Provider
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
    </WizardContext.Provider>
  );
};

export default WizardProvider;
