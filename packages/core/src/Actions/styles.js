import { semanticStyles } from "../withSemantic";

const styles = (theme) => ({
  root: {},
  button: {
    "&:not(:last-child)": {
      marginRight: theme.spacing("xs"),
    },
  },
  actionContainer: {
    display: "flex",
    float: "right",
  },
  dropDownMenu: {},
  dropDownMenuButton: {
    ...semanticStyles(theme),
  },
  dropDownMenuButtonSelected: {
    backgroundColor: theme.palette.atmo1,
    "&:hover:not(:disabled)": {
      backgroundColor: theme.palette.atmo1,
    },
    "& svg .color0": {
      fill: theme.palette.acce1,
    },
  },
});

export default styles;
