import {
  HvBox,
  HvDropdown,
  useTheme,
  themes,
} from "@hitachivantara/uikit-core";

export const ThemeSwitcher = () => {
  const {
    selectedTheme,
    selectedMode,
    colorModes,
    onChangeTheme,
    onChangeColorMode,
  } = useTheme();

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
        onChange={onChangeTheme}
      />
      <HvDropdown
        css={{ width: 150 }}
        value={selectedMode}
        options={colorModes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={onChangeColorMode}
      />
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
