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
  updateThemeChanges?: boolean;
  isBaseChange?: boolean;
  isReset?: boolean;
  isCodeEdit?: boolean;
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

const initialTheme = createTheme({ name: "customTheme", base: "ds5" });

const GeneratorProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customTheme, setCustomTheme] = useState(initialTheme);
  const [themeChanges, setThemeChanges] = useState({});

  const updateCustomTheme = useCallback(
    (
      changes: DeepPartial<HvTheme | HvThemeStructure>,
      options: GeneratorContextOptions = {
        updateThemeChanges: true,
        isBaseChange: false,
        isReset: false,
        isCodeEdit: false,
      }
    ) => {
      const {
        updateThemeChanges = true,
        isBaseChange = false,
        isReset = false,
        isCodeEdit = false,
      } = options;
      setCustomTheme((prev) => {
        let newTheme;
        if (isReset) {
          setThemeChanges({});
          newTheme = createTheme({
            base: "ds5",
            name: "customTheme",
          });
          return newTheme;
        }

        if (!isBaseChange) {
          if (!isCodeEdit) {
            const diff = themeDiff(prev, changes);
            return merge({}, prev, diff);
          }
          newTheme = createTheme({
            base: changes.base as HvBaseTheme,
            name: prev.name,
          });
          const merged = merge({}, newTheme, changes);
          return merged;
        }

        newTheme = createTheme({
          ...themeChanges,
          base: changes.base as HvBaseTheme,
          name: prev.name,
        });
        return newTheme;
      });

      // Update theme changes
      if (updateThemeChanges) {
        if (!isCodeEdit) {
          setThemeChanges((prev) => {
            return merge({}, prev, changes);
          });
        } else {
          setThemeChanges(changes);
        }
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
