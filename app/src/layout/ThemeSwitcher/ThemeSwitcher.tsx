import { useContext } from "react";
import {
  HvBox,
  HvDropdown,
  HvThemeContext,
} from "@hitachivantara/uikit-react-core";
import styled from "@emotion/styled";

const StyledDropdown = styled(HvDropdown)({
  width: 150,
});

export const ThemeSwitcher = () => {
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useContext(HvThemeContext);

  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <StyledDropdown
        values={themes.map((name) => ({
          label: name,
          selected: selectedTheme === name,
        }))}
        onChange={(item) => changeTheme(item.label, selectedMode)}
      />
      <StyledDropdown
        values={colorModes.map((name) => ({
          label: name,
          selected: selectedMode === name,
        }))}
        onChange={(item) => changeTheme(selectedTheme, item.label)}
      />
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  ThemeSwitcher.displayName = "ThemeSwitcher";
}
