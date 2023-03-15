import { createTheme, theme } from "@hitachivantara/uikit-react-core";

const headerTheme = createTheme({
  name: "purple",
  base: "ds5",
  radii: {
    base: "20px",
    round: "20px",
  },
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
