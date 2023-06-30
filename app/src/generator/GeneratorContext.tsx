import {
  createTheme,
  DeepPartial,
  HvTheme,
} from "@hitachivantara/uikit-react-core";
import { HvBaseTheme, HvThemeStructure } from "@hitachivantara/uikit-styles";
import React, {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import merge from "lodash/merge";
import { themeDiff } from "./utils";

type GeneratorContextOptions = {
  addToHistory?: boolean;
  updateThemeChanges?: boolean;
  isBaseChange?: boolean;
  isReset?: boolean;
};

type GeneratorContextProp = {
  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (
    changes: DeepPartial<HvTheme | HvThemeStructure>,
    options?: GeneratorContextOptions
  ) => void;

  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;

  tutorialOpen?: boolean;
  setTutorialOpen?: Dispatch<SetStateAction<boolean>>;

  currentStep?: number;
  setCurrentStep?: Dispatch<SetStateAction<number>>;

  themeChanges?: Partial<HvTheme | HvThemeStructure>;
};

export const GeneratorContext = createContext<GeneratorContextProp>({
  customTheme: createTheme({ name: "customTheme", base: "ds5" }),
  updateCustomTheme: () => {},
});

const GeneratorProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customTheme, setCustomTheme] = useState(() =>
    createTheme({ name: "customTheme", base: "ds5" })
  );
  const [themeChanges, setThemeChanges] = useState({});

  const updateCustomTheme = useCallback(
    (
      changes: DeepPartial<HvTheme | HvThemeStructure>,
      options: GeneratorContextOptions = {
        addToHistory: true,
        updateThemeChanges: true,
        isBaseChange: false,
        isReset: false,
      }
    ) => {
      const { updateThemeChanges, isBaseChange, isReset } = options;
      setCustomTheme((prev) => {
        let newTheme;
        if (isReset) {
          setThemeChanges({});
          newTheme = createTheme({
            base: changes.base as HvBaseTheme,
            name: prev.name,
          });
          return newTheme;
        }

        if (!isBaseChange) {
          const diff = themeDiff(prev, changes);
          return merge({}, prev, diff);
        }

        newTheme = createTheme({
          base: changes.base as HvBaseTheme,
          name: prev.name,
          ...themeChanges,
        });
        return newTheme;
      });

      // Update theme changes
      if (updateThemeChanges) {
        setThemeChanges((prev) => {
          return merge({}, prev, changes);
        });
      }
    },
    [themeChanges]
  );

  const value = useMemo(
    () => ({
      customTheme,
      updateCustomTheme,
      open,
      setOpen,
      tutorialOpen,
      setTutorialOpen,
      currentStep,
      setCurrentStep,
      themeChanges,
    }),
    [
      customTheme,
      updateCustomTheme,
      open,
      setOpen,
      tutorialOpen,
      setTutorialOpen,
      currentStep,
      setCurrentStep,
      themeChanges,
    ]
  );

  return (
    <GeneratorContext.Provider value={value}>
      {children}
    </GeneratorContext.Provider>
  );
};

export default GeneratorProvider;
