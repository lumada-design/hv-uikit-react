import { useContext } from "react";
import {
  HvBox,
  HvDropdown,
  themes,
  ThemeContext,
} from "@hitachivantara/uikit-core";

export const ThemeSwitcher = () => {
  const { selectedTheme, selectedMode, setTheme, setThemeMode, colorModes } =
    useContext(ThemeContext);

  const themesList = Object.keys(themes);

  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <HvDropdown
        css={{ width: 150 }}
        value={selectedTheme}
        options={themesList.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={setTheme}
      />
      <HvDropdown
        css={{ width: 150 }}
        value={selectedMode}
        options={colorModes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={setThemeMode}
      />
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
