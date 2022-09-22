import {
  HvButton,
  HvDropdown,
  HvTypography,
  HvHeader,
  DropdownOption,
  useTheme,
  spacingFn,
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
    <>
      <HvHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: spacingFn(2),
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
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <HvButton variant="solid" size="xl">
          Big
        </HvButton>
        <br />
        <br />

        <HvButton variant="subtle" size="xs">
          Small
        </HvButton>
      </div>
      <br />
      <br />
      <HvTypography variant="title3">theme: {theme}</HvTypography>
      <HvTypography variant="body">colorMode: {colorMode}</HvTypography>
    </>
  );
};

export default Demo;
