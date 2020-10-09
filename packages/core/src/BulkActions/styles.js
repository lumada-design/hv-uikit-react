import { semanticStyles } from "../withSemantic";
import fade from "../utils/hexToRgbA";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.atmo1,
    margin: theme.hvSpacing("sm", 0, "xs"),
  },
  semantic: {
    backgroundColor: theme.palette.sema7,
    "& $selectAll div": {
      ...semanticStyles(theme),
    },
    "& $selectAll:focus-within div": {
      backgroundColor: fade(theme.palette.base1, 0.3),
    },
    // IE fallback code (using focus-within-polyfill)
    "& $selectAll.focus-within div": {
      backgroundColor: fade(theme.palette.base1, 0.3),
    },
  },
  selectAllContainer: {},
  selectAll: {},
  selectAllPages: {},
  actions: {
    display: "inline-flex",
    marginLeft: "auto",
  },
});

export default styles;
