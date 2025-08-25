"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import {
  createTheme,
  DeepPartial,
  HvTheme,
} from "@hitachivantara/uikit-react-core";
import { HvThemeStructure, mergeTheme } from "@hitachivantara/uikit-styles";

export type ColorMode = "dawn" | "wicked";

interface GeneratorContextValue {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;

  customTheme: HvTheme | HvThemeStructure;
  updateCustomTheme: (
    changes: DeepPartial<HvTheme | HvThemeStructure>,
    options?: Record<string, any>,
  ) => void;
}

const GeneratorContext = createContext<GeneratorContextValue | undefined>(
  undefined,
);

interface GeneratorProviderProps {
  children: ReactNode;
  defaultColorMode?: ColorMode;
}

const initialTheme = createTheme({ name: "customTheme", base: "pentahoPlus" });

export const GeneratorProvider = ({
  children,
  defaultColorMode = "dawn",
}: GeneratorProviderProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode);
  const [customTheme, setCustomTheme] = useState(initialTheme);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "dawn" ? "wicked" : "dawn"));
  };

  const updateCustomTheme = useCallback(
    (changes: DeepPartial<HvTheme | HvThemeStructure>) => {
      setCustomTheme((prev) => {
        if (Object.keys(changes).length === 0) return initialTheme;
        const newTheme = mergeTheme(prev, changes);
        return newTheme;
      });
    },
    [],
  );

  const value: GeneratorContextValue = {
    colorMode,
    setColorMode,
    toggleColorMode,
    customTheme,
    updateCustomTheme,
  };

  return (
    <GeneratorContext.Provider value={value}>
      {children}
    </GeneratorContext.Provider>
  );
};

export const useGeneratorContext = (): GeneratorContextValue => {
  const context = useContext(GeneratorContext);
  if (context === undefined) {
    throw new Error(
      "useGeneratorContext must be used within a GeneratorProvider",
    );
  }
  return context;
};
