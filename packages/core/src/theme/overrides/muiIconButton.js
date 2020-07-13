import { outlineStyles } from "../../Focus/styles";

const muiIconButton = theme => ({
  root: {
    padding: 0,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.atmosphere.atmo3
    },
    "&:focus": {
      ...outlineStyles
    }
  }
});

export default muiIconButton;
