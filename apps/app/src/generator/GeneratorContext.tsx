import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createTheme,
  DeepPartial,
  HvTheme,
} from "@hitachivantara/uikit-react-core";
import {
  HvBaseTheme,
  HvThemeStructure,
  mergeTheme,
} from "@hitachivantara/uikit-styles";

import { themeDiff } from "./utils";

type GeneratorContextOptions = {
  updateThemeChanges?: boolean;
  isBaseChange?: boolean;
  isReset?: boolean;
  isCodeEdit?: boolean;
};

type GeneratorContextValue = {
  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (
    changes: DeepPartial<HvTheme | HvThemeStructure>,
    options?: GeneratorContextOptions,
  ) => void;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  tutorialOpen: boolean;
  setTutorialOpen: Dispatch<SetStateAction<boolean>>;

  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;

  themeChanges?: Partial<HvTheme | HvThemeStructure>;
};

export const GeneratorContext = createContext<GeneratorContextValue | null>(
  null,
);

const initialTheme = createTheme({ name: "customTheme", base: "pentaho" });

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
      },
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
            base: "pentaho",
            name: "customTheme",
          });
          return newTheme;
        }

        if (!isBaseChange) {
          if (!isCodeEdit) {
            const diff = themeDiff(prev, changes);
            return mergeTheme(prev, diff);
          }
          newTheme = createTheme({
            base: changes.base as HvBaseTheme,
            name: prev.name,
          });
          return mergeTheme(newTheme, changes);
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
          setThemeChanges((prev) => mergeTheme(prev, changes));
        } else {
          setThemeChanges(changes);
        }
      }
    },
    [themeChanges],
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
    ],
  );

  return (
    <GeneratorContext.Provider value={value}>
      {children}
    </GeneratorContext.Provider>
  );
};

export const useGeneratorContext = () => {
  const context = useContext(GeneratorContext);
  if (context === null) {
    throw new Error(
      "useGeneratorContext must be used within a GeneratorProvider",
    );
  }
  return context;
};

export default GeneratorProvider;
