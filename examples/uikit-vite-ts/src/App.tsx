import {
  HvButton,
  HvContainer,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { ThemeSwitcher } from "@hitachivantara/uikit-react-icons";
import {
  StyledContainer,
  StyledLink,
  StyledThemeSwitcherContainer,
} from "./App.styles";

const App = () => {
  const { selectedTheme, selectedMode, changeTheme } = useTheme();

  const handleChangeTheme = () => {
    changeTheme(selectedTheme, selectedMode === "wicked" ? "dawn" : "wicked");
  };

  return (
    <StyledContainer>
      <HvContainer maxWidth="md">
        <HvTypography variant="title1">
          Hitachi Vantara UI Kit example with Vite.js, React, and TypeScript
        </HvTypography>
        <br />
        <HvTypography variant="body">
          Find more information about Hitachi Vantara UI Kit{" "}
          <StyledLink
            href="https://lumada-design.github.io/uikit/master"
            target="_blank"
          >
            here
          </StyledLink>
          .
        </HvTypography>
        <StyledThemeSwitcherContainer>
          <HvTypography variant="label">
            Current theme: {selectedMode}
          </HvTypography>
          <HvButton icon aria-label="Change theme" onClick={handleChangeTheme}>
            <ThemeSwitcher />
          </HvButton>
        </StyledThemeSwitcherContainer>
      </HvContainer>
    </StyledContainer>
  );
};

export default App;
