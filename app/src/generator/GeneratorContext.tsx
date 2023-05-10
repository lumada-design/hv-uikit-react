import { createTheme, HvTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";
import { createContext, useState, Dispatch, SetStateAction } from "react";

type GeneratorContextProp = {
  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (newTheme: any) => void;

  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;

  tutorialOpen?: boolean;
  setTutorialOpen?: Dispatch<SetStateAction<boolean>>;

  currentStep?: number;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
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

  const updateCustomTheme = (newTheme) => {
    setCustomTheme(newTheme);
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
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export default GeneratorProvider;
