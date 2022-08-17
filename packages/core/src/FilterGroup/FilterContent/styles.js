import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  root: {
    width: 640,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    maxHeight: "calc(500px - 75px)",
    minHeight: "calc(370px - 75px)",
    "& div$leftSidePanel": {
      display: "inline-block",
      width: `calc(50% - ${theme.spacing("sm")} - ${theme.spacing("sm")} + 8px)`,
      height: `calc(100% - ${theme.spacing("sm")} - ${theme.spacing("sm")} + 8px)`,
      verticalAlign: "top",
      maxHeight: "calc(500px - 75px)",
      minHeight: "calc(370px - 75px)",
      padding: 4,
      margin: `calc(${theme.spacing("sm")} - 4px)`,
    },
    "& div$rightSidePanel": {
      display: "inline-block",
      width: "50%",
      height: "100%",
      maxHeight: "calc(500px - 75px)",
      minHeight: "calc(370px - 75px)",
      verticalAlign: "top",
      overflow: "visible",
      boxShadow: `inset 8px 0 8px -6px ${theme.hv.palette.shadow.shad1}`,
    },
  },
  panel: {
    maxHeight: 500,
    minHeight: 370,
  },
  actionBar: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },
  space: {
    flex: 1,
  },
  baseDropdownSelection: {
    padding: "0 30px 0 0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: 32,
  },
  leftSidePanel: {},
  rightSidePanel: {},
}));

export default styles;
