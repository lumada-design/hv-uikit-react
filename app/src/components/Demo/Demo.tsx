import {
  HvButton,
  HvDropdown,
  HvTypography,
  DropdownOption,
  useTheme,
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
      <HvDropdown
        value={theme}
        options={themeOptions}
        onChange={onChangeTheme}
      />
      <HvDropdown
        value={colorMode}
        options={presetsOptions}
        onChange={onChangePreset}
      />
      <br />
      <br />
      <HvButton variant="solid" size="xl">
        Big
      </HvButton>
      <br />
      <br />

      <HvButton variant="subtle" size="xs">
        Small
      </HvButton>
      <br />
      <br />
      <HvTypography variant="title3">theme: {theme}</HvTypography>
      <HvTypography variant="body">colorMode: {colorMode}</HvTypography>
    </>
  );
};

export default Demo;
