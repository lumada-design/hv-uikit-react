import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    width: 640,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    maxHeight: "calc(500px - 75px)",
    minHeight: "calc(370px - 75px)",
    "& div$leftSidePanel": {
      display: "inline-block",
      width: `calc(50% - ${theme.spacing("sm")}px - ${theme.spacing("sm")}px + 8px)`,
      height: `calc(100% - ${theme.spacing("sm")}px - ${theme.spacing("sm")}px + 8px)`,
      verticalAlign: "top",
      maxHeight: "calc(500px - 75px)",
      minHeight: "calc(370px - 75px)",
      padding: 4,
      margin: theme.spacing("sm") - 4,
    },
    "& div$rightSidePanel": {
      display: "inline-block",
      width: "50%",
      height: "100%",
      maxHeight: "calc(500px - 75px)",
      minHeight: "calc(370px - 75px)",
      verticalAlign: "top",
      overflow: "visible",
      boxShadow: `inset 8px 0 8px -6px ${theme.hv.palette.shadow}`,
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
  leftSidePanel: {},
  rightSidePanel: {},
}));

export default styles;
