import {
  HvTypography,
  HvButton,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { ThemeSwitcher } from "@hitachivantara/uikit-react-icons";
import styled from "@emotion/styled";

export const Context = () => {
  const { selectedTheme, selectedMode, changeTheme } = useTheme();

  const StyledContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: theme.space.xs,
    padding: theme.space.xs,
  });

  return (
    <StyledContainer>
      <HvButton
        icon
        variant="secondaryGhost"
        onClick={() =>
          changeTheme(
            selectedTheme,
            selectedMode === "dawn" ? "wicked" : "dawn"
          )
        }
      >
        <ThemeSwitcher />
      </HvButton>
      <HvTypography variant="label">
        Selected theme: {selectedTheme}
      </HvTypography>
      <HvTypography variant="label">
        Selected color mode: {selectedMode}
      </HvTypography>
    </StyledContainer>
  );
};
