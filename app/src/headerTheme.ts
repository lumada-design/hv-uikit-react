import { HvTheme, theme } from "@hitachivantara/uikit-react-core";

const customTheme: HvTheme = {
  baseTheme: "ds5",
  baseColorMode: "dawn",
  name: "header-theme",
  header: {
    color: "#B167EF",
    height: "60px",
    hoverColor: "transparent",
    selectedItemColor: theme.colors.atmo1,
    selectedItemBackgroundColor: "#B167EF",
    selectedItemBorderTopColor: "transparent",
    selectedItemBorderTopThickness: "0px",
    selectedItemBorderBottomColor: "transparent",
    selectedItemBorderBottomThickness: "0px",
  },
};

export default customTheme;
