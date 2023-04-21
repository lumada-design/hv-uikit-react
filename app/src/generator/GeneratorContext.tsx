import { createTheme, HvTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";
import { createContext, useState, Dispatch, SetStateAction } from "react";

type GeneratorContextProp = {
  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (newTheme: any) => void;

  changedValues?: Partial<HvTheme | HvThemeStructure>;
  updateChangedValues?: (path: any, key: any, reset?: boolean) => void;

  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;

  tutorialOpen?: boolean;
  setTutorialOpen?: Dispatch<SetStateAction<boolean>>;
};

export const GeneratorContext = createContext<GeneratorContextProp>({
  customTheme: createTheme({ name: "customTheme", base: "ds5" }),
  updateCustomTheme: () => {},
});

const GeneratorProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [changedValues, setChangedValues] = useState({});

  const [customTheme, setCustomTheme] = useState(
    createTheme({ name: "customTheme", base: "ds5" })
  );

  const updateCustomTheme = (newTheme) => {
    setCustomTheme(newTheme);
  };

  const updateChangedValues = (path, value, reset = false) => {
    if (reset) {
      setChangedValues({ name: "customTheme", base: "ds5" });
    } else {
      setChangedValues((prevState) => {
        const newState = { ...prevState };
        let node = newState;
        path.forEach((key, index) => {
          if (!node[key]) {
            node[key] = {};
          }
          if (index === path.length - 1) {
            node[key] = value;
          } else {
            node = node[key];
          }
        });
        return newState;
      });
    }
  };

  return (
    <GeneratorContext.Provider
      value={{
        customTheme,
        updateCustomTheme,
        changedValues,
        updateChangedValues,
        open,
        setOpen,
        tutorialOpen,
        setTutorialOpen,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export default GeneratorProvider;
