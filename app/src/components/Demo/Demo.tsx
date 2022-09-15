import styled from "@emotion/styled";
import {
  HvDropdown,
  DropdownOption,
  useTheme,
  themeVars,
} from "@hitachivantara/uikit-react-core";

type TextProps = {
  variant: string;
};

const Demo = () => {
  const { theme, setTheme, colorMode, setColorMode, themes, colorModes } =
    useTheme();

  const Text = styled.div<TextProps>((props) => ({
    padding: 20,
    color: themeVars.colors.primary,
    backgroundColor: themeVars.colors.background,
    fontSize: themeVars.typography[props.variant],
  }));

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
      <Text variant="title">theme: {theme}</Text>
      <Text variant="normal ">colorMode: {colorMode}</Text>
    </>
  );
};

export default Demo;
