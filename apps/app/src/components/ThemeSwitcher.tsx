import { HvDropdown, useTheme } from "@hitachivantara/uikit-react-core";

export const ThemeSwitcher = () => {
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useTheme();

  return (
    <div className="flex gap-sm">
      <HvDropdown
        className="w-150px"
        values={themes.map((name) => ({
          value: name,
          label: name,
          selected: name === selectedTheme,
        }))}
        onChange={(theme) => changeTheme(theme?.value, selectedMode)}
      />
      <HvDropdown
        className="w-150px"
        values={colorModes.map((name) => ({
          value: name,
          label: name,
          selected: name === selectedMode,
        }))}
        onChange={(mode) => changeTheme(selectedTheme, mode?.value)}
      />
    </div>
  );
};
