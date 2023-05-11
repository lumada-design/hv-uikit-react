import { createTheme, HvTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type GeneratorContextProp = {
  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (
    newTheme: HvThemeStructure | HvTheme,
    addToHistory?: boolean
  ) => void;

  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;

  tutorialOpen?: boolean;
  setTutorialOpen?: Dispatch<SetStateAction<boolean>>;

  currentStep?: number;
  setCurrentStep?: Dispatch<SetStateAction<number>>;

  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
};

export const GeneratorContext = createContext<GeneratorContextProp>({
  customTheme: createTheme({ name: "customTheme", base: "ds5" }),
  updateCustomTheme: () => {},
});

const GeneratorProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customTheme, setCustomTheme] = useState(
    createTheme({ name: "customTheme", base: "ds5" })
  );
  const [history, setHistory] = useState<HvTheme[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateCustomTheme = (newTheme, addToHistory = true) => {
    if (addToHistory) {
      let newHistory: HvTheme[] = history;
      if (history.length - historyStep > 1) {
        // changing the theme with posterior history, we want to clear
        // that history so that the new custom theme is the most current
        newHistory = history.slice(0, historyStep + 1);
      }

      setHistory([...newHistory, newTheme]);
      setHistoryStep((prev) => prev + 1);
    }
    setCustomTheme(newTheme);
  };

  useEffect(() => {
    if (historyStep > 0) {
      setCanUndo(true);
    } else {
      setCanUndo(false);
    }
    if (historyStep < history.length - 1) {
      setCanRedo(true);
    } else {
      setCanRedo(false);
    }
  }, [historyStep]);

  useEffect(() => {
    const historyTheme = history[historyStep];
    if (historyTheme) setCustomTheme(historyTheme);
  }, [historyStep]);

  const undo = () => {
    setHistoryStep((prev) => prev - 1);
  };

  const redo = () => {
    setHistoryStep((prev) => prev + 1);
  };

  return (
    <GeneratorContext.Provider
      value={{
        customTheme,
        updateCustomTheme,
        open,
        setOpen,
        tutorialOpen,
        setTutorialOpen,
        currentStep,
        setCurrentStep,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export default GeneratorProvider;
