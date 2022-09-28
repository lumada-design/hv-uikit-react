import { HvDropdown, useTheme } from "@hitachivantara/uikit-react-core";

const ThemeSwitcher: React.FC = () => {
  const {
    themesNames,
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
  } = useTheme();

  return (
    <>
      <HvDropdown
        value={selectedTheme}
        options={themesNames.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(e) => changeTheme(e.target.value)}
      />
      <HvDropdown
        value={selectedColorMode}
        options={themeColorModes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(e) => changeColorMode(e.target.value)}
      />
    </>
  );
};

export default ThemeSwitcher;

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
