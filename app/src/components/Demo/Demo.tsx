import styled from "@emotion/styled";
import {
  HvButton,
  useTheme,
  themeVars,
} from "@hitachivantara/uikit-react-core";

const Demo = () => {
  const { theme, toggleTheme } = useTheme();

  const Text = styled.div({
    padding: 20,
    color: themeVars.colors.primary,
    backgroundColor: themeVars.colors.background,
  });

  return (
    <>
      <HvButton onClick={toggleTheme}>{theme}</HvButton>
      <Text>This renders when the theme is {theme}</Text>
    </>
  );
};

export default Demo;
