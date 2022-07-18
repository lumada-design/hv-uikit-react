import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  root: {
    "& ul$list": {
      width: "calc(100% + 8px)",
      height: "calc(100% - 70px)",
      overflowY: "auto",
      margin: -4,
      padding: 4,
    },
  },
  search: {
    marginBottom: theme.hvSpacing("xs"),
  },
  list: {},
  hiddenOption: {
    display: "none",
  },
  selectAllContainer: {
    // prevent the focus ring to be hidden by sibling hover background
    "&": {
      position: "relative",
      zIndex: 0,
    },
    "&:focus-within": {
      zIndex: 1,
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      zIndex: 1,
    },
  },
  selectAll: {
    width: "100%",
  },
}));

export default styles;
