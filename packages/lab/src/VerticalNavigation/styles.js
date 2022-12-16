import { makeStyles } from "@mui/styles";

const styles = (props) =>
  makeStyles((theme) => ({
    panel: {
      position: "fixed",
      top: props.topPosition,
      left: 0,
      zIndex: 1100,
    },
    panelExpanded: {
      width: props.expandedPanelWidth,
      height: `calc(100vh - ${props.topPosition}px)`,

      // This is for the bottom actions
      "& > :not(:first-child) > button > span": {
        marginBottom: 0,
      },
    },
    panelCollapsed: {
      width: props.collapsedPanelWidth,
      height: `calc(100vh - ${props.topPosition}px)`,

      // This is for the bottom actions
      "& > :not(:first-child)": {
        padding: theme.hvSpacing("xs", "xs", "sm", "xs"),

        "& > button > span": {
          marginLeft: 0,
        },
      },
      // This is for the top menu items
      "& > :first-child:not(:last-child)": {
        padding: theme.hvSpacing("sm", "xs", "xs", "xs"),
      },

      "& > nav > ul > li > div > div": {
        marginLeft: "6px",
      },
    },
    collapseButton: {
      ...theme.hv.typography.normalText,
      width: "100%",

      "& > span": {
        justifyContent: "flex-start",
      },
    },
    expandButton: {
      width: "100%",
      minWidth: "unset",

      "& > span > span": {
        marginLeft: "unset",
      },
    },
    collapseTextContainer: {
      width: "100%",
      textAlign: "left",
    },
  }));

export default styles;
