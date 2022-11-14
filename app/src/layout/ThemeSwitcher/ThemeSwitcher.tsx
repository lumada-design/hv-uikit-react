import {
  HvBox,
  HvDropdown,
  useTheme,
  themes,
} from "@hitachivantara/uikit-core";

export const ThemeSwitcher = () => {
  const {
    selectedTheme,
    selectedColorMode,
    themeColorModes,
    changeTheme,
    changeColorMode,
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
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
