import { useContext } from "react";
import { HvBox, HvDropdown, HvThemeContext } from "@hitachivantara/uikit-core";

export const ThemeSwitcher = () => {
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useContext(HvThemeContext);

  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <HvDropdown
        css={{ width: 150 }}
        value={selectedTheme}
        options={themes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(theme) => changeTheme(theme, selectedMode)}
      />
      <HvDropdown
        css={{ width: 150 }}
        value={selectedMode}
        options={colorModes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(mode) => changeTheme(selectedTheme, mode)}
      />
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
