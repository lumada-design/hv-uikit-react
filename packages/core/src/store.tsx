import { useState } from "react";
import { createContainer } from "react-tracked";
import { hvThemes } from "theme";
import { parseTheme } from "theme/utils";

export type State = {
  themes: string[];
  theme: string;
  colorModes: string[];
  colorMode: string;
};

const { themesList, selectedTheme, colorModesList, selectedColorMode } =
  parseTheme(hvThemes);

const initialState = {
  themes: themesList,
  theme: selectedTheme,
  colorModes: colorModesList,
  colorMode: selectedColorMode,
};

const useValue = () => useState<State>(initialState);

export const { Provider: StoreProvider, useTracked } =
  createContainer(useValue);
