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
              <div style={{ width: 100 }}>
                <HvTypography variant="body">Theme: </HvTypography>
              </div>
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
              <div style={{ width: 200 }}>
                <HvTypography variant="body">Color Scheme: </HvTypography>
              </div>
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
          flexWrap: "wrap",
          gap: themeUtils.spacing(5),
        }}
      >
        <HvButton variant="primary">primary</HvButton>
        <HvButton variant="primarySubtle">primarySubtle</HvButton>
        <HvButton variant="primaryGhost">primaryGhost</HvButton>
        <HvButton variant="secondary">
          secondary <em>(deprecated)</em>
        </HvButton>
        <HvButton variant="secondarySubtle">secondarySubtle</HvButton>
        <HvButton variant="secondaryGhost">secondaryGhost</HvButton>
        <HvButton variant="ghost">
          ghost <em>(deprecated)</em>
        </HvButton>
      </div>
    </div>
  );
};

export default Demo;
