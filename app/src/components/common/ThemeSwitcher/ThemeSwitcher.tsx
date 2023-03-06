import { useContext } from "react";
import {
  HvBox,
  HvDropdown,
  HvThemeContext,
} from "@hitachivantara/uikit-react-core";

export const ThemeSwitcher = () => {
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useContext(HvThemeContext);

  return (
    <HvBox css={{ display: "flex", gap: 20 }}>
      <HvDropdown
        css={{ width: 150 }}
        values={themes.map((name) => ({
          value: name,
          label: name,
          selected: name === selectedTheme,
        }))}
        onChange={(theme) => changeTheme(theme.value, selectedMode)}
      />
      <HvDropdown
        css={{ width: 150 }}
        values={colorModes.map((name) => ({
          value: name,
          label: name,
          selected: name === selectedMode,
        }))}
        onChange={(mode) => changeTheme(selectedTheme, mode.value)}
      />
    </HvBox>
  );
};
