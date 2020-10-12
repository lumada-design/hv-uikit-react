import { semanticStyles } from "../withSemantic";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.atmo1,
    margin: theme.hvSpacing("sm", 0, "xs"),
  },
  editMode: {
    backgroundColor: theme.palette.sema7,
    "& $selectAll": {
      ...semanticStyles(theme),
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
