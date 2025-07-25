import { HvSelect, useTheme } from "@hitachivantara/uikit-react-core";

export const ThemeSwitcher = () => {
  const {
    selectedTheme,
    selectedMode,
    colorModes,
    themes,
    changeTheme,
    changeMode,
  } = useTheme();

  return (
    <div className="flex gap-sm">
      <HvSelect
        className="w-150px"
        value={selectedTheme}
        options={themes.map((name) => ({ value: name, label: name }))}
        onChange={(evt, value) => changeTheme(value!)}
      />
      <HvSelect
        className="w-150px"
        value={selectedMode}
        options={colorModes.map((name) => ({ value: name, label: name }))}
        onChange={(evt, value) =>
          changeMode(value === "dark" ? "dark" : "light")
        }
      />
    </div>
  );
};
