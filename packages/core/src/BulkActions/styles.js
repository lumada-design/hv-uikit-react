import { semanticStyles } from "../withSemantic";
import fade from "../utils/hexToRgbA";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.atmo1,
    margin: theme.spacing("sm", 0, "xs")
  },
  editMode: {
    backgroundColor: theme.palette.sema7,
    "& $selectAll": {
      ...semanticStyles(theme)
    },
    "& $selectAll:focus-within": {
      backgroundColor: fade(theme.palette.base1, 0.3)
    }
  },
  selectAllContainer: {},
  selectAll: {},
  selectAllPages: {},
  actions: {
    display: "inline-flex",
    marginLeft: "auto"
  }
});

export default styles;
