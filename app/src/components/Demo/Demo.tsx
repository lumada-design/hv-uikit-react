import {
  HvButton,
  HvDropdown,
  HvTypography,
  HvHeader,
  DropdownOption,
  useTheme,
  themeUtils,
  themeVars,
} from "@hitachivantara/uikit-react-core";

const Demo = () => {
  const { themes, theme, setTheme, colorModes, colorMode, setColorMode } =
    useTheme();

  const themeOptions: DropdownOption[] = themes.map((themeValue) => ({
    value: themeValue,
    label: themeValue,
  }));

  const presetsOptions: DropdownOption[] = colorModes.map((presetValue) => ({
    value: presetValue,
    label: presetValue,
  }));

  const onChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const onChangePreset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColorMode(event.target.value);
  };

  return (
    <div style={{ backgroundColor: themeVars.colors.atmo2, height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <HvHeader>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: themeUtils.spacing(2),
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <HvTypography variant="body">Theme: </HvTypography>
              <HvDropdown
                value={theme}
                options={themeOptions}
                onChange={onChangeTheme}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <HvTypography variant="body">Color Scheme: </HvTypography>
              <HvDropdown
                value={colorMode}
                options={presetsOptions}
                onChange={onChangePreset}
              />
            </div>
          </div>
        </HvHeader>
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {console.log(theme)}
        <HvButton variant="primary">primary</HvButton>
        <HvButton
          variant={theme === "ds5Theme" ? "secondarySubtle" : "secondary"}
        >
          {theme === "ds5Theme" ? "secondarySubtle" : "secondary"}
        </HvButton>
        <HvButton variant={theme === "ds5Theme" ? "primaryGhost" : "ghost"}>
          {theme === "ds5Theme" ? "primaryGhost" : "ghost"}
        </HvButton>
        {theme === "ds5Theme" && (
          <>
            <HvButton variant="primarySubtle">primarySubtle</HvButton>
            <HvButton variant="secondaryGhost">secondaryGhost</HvButton>
          </>
        )}
      </div>
      <br />
      <br />
      <HvTypography variant="title3">theme: {theme}</HvTypography>
      <HvTypography variant="body">colorMode: {colorMode}</HvTypography>
    </div>
  );
};

export default Demo;
