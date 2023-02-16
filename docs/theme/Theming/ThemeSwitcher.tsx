import React, { useContext } from "react";
// @ts-ignore
import { HvThemeContext, HvBox, HvDropdown } from "@hitachivantara/uikit-core";
import styled from "@emotion/styled";

export const ThemeSwitcher = () => {
  // @ts-ignore
  const { selectedTheme, selectedMode, colorModes, themes, changeTheme } =
    useContext(HvThemeContext);

  const StyledDropdown = styled(HvDropdown)({
    width: "200px",
  });

  return (
    <HvBox sx={{ display: "flex", margin: "10px", gap: 20 }}>
      <StyledDropdown
        value={selectedTheme}
        options={themes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(theme) => changeTheme(theme, selectedMode)}
      />
      <StyledDropdown
        value={selectedMode}
        options={colorModes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(mode) => changeTheme(selectedTheme, mode)}
      />
    </HvBox>
  );
};
