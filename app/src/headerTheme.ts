import { createTheme, theme } from "@hitachivantara/uikit-react-core";

const headerTheme = createTheme({
  name: "header-theme",
  base: "ds5",
  header: {
    color: "#B167EF",
    brandColor: "#B167EF",
    height: "60px",
    hoverColor: "transparent",
    selectedItemColor: theme.colors.atmo1,
    selectedItemBackgroundColor: "#B167EF",
    selectedItemBorderTopColor: "transparent",
    selectedItemBorderTopThickness: "0px",
    selectedItemBorderBottomColor: "transparent",
    selectedItemBorderBottomThickness: "0px",
  },
});

export default headerTheme;
