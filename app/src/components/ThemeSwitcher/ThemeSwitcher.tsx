import { HvDropdown, useTheme } from "@hitachivantara/uikit-react-core";

export const ThemeSwitcher: React.FC = () => {
  const {
    themesNames,
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
  } = useTheme();

  return (
    <div css={{ display: "flex", margin: "20px 0", gap: 20 }}>
      <HvDropdown
        css={{ width: 150 }}
        value={selectedTheme}
        options={themesNames.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={changeTheme}
      />
      <HvDropdown
        css={{ width: 150 }}
        value={selectedColorMode}
        options={themeColorModes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={changeColorMode}
      />
    </div>
  );
};

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
