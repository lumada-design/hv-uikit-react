import {
  HvButton,
  HvDropdown,
  HvTypography,
  HvHeader,
  DropdownOption,
  useTheme,
  themeVars,
  HvBox,
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
    <HvBox as="main" sx={ (otherTheme) => ({ backgroundColor: otherTheme.colors.atmo2, height: "100vh" })} >
      <HvBox as="nav" style={{ backgroundColor: themeVars.colors.atmo2, display: "flex", flexDirection: "column" }}>
        <HvHeader>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
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
      </HvBox>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <HvButton variant={"primary"}>primary</HvButton>
        <HvButton variant={"primary"}>primarySubtle</HvButton>
        <HvButton variant={"primary"}>primaryGhost</HvButton>
        <HvButton variant={"primary"}>
          secondary <em>(deprecated)</em>
        </HvButton>
        <HvButton variant={"primary"}>secondarySubtle</HvButton>
        <HvButton variant={"primary"}>secondaryGhost</HvButton>
        <HvButton variant={"primary"}>
          ghost <em>(deprecated)</em>
        </HvButton>
      </div>
      <br />
      <br />
      <HvTypography variant="title3">theme: {theme}</HvTypography>
      <HvTypography variant="body">colorMode: {colorMode}</HvTypography>
      <HvBox sx={{ backgroundColor: "red"}}>
        <HvButton variant="primary">Big</HvButton>
        <HvButton variant="primary">Small</HvButton>
      </HvBox>
      <HvBox sx={ (otherTheme) => ({ backgroundColor: otherTheme.colors.acce1, marginTop: otherTheme.spacing.base})}>
        <HvButton variant="primary">Big</HvButton>
        <HvButton variant="primary">Small</HvButton>
      </HvBox>
    </HvBox>
  );
};

export default Demo;
