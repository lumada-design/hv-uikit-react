import { makeStyles } from "@mui/styles";

const styles = (props) =>
  makeStyles((theme) => ({
    panel: {
      justifyContent: "flex-start",
      position: props.position,
      top: props.topPosition,
      left: 0,
      zIndex: 1100,
    },
    panelExpanded: {
      width: props.expandedPanelWidth,
      height: `calc(100vh - ${props.topPosition}px)`,

      // To remove the top border of the navigation section
      "& > :not(:first-child)": {
        borderTop: "none",
      },
    },
    panelCollapsed: {
      width: props.collapsedPanelWidth,
      height: `calc(100vh - ${props.topPosition}px)`,

      // Customize the navigation section
      "& > :not(:first-child)": {
        borderTop: "none",
        padding: theme.hvSpacing("xs", "xs", "sm", "xs"),
      },

      // Customize the collapse / expand
      "& > :first-child:not(:last-child)": {
        padding: theme.hvSpacing("sm", "xs", "xs", "xs"),
      },

      "& > nav > ul > li > div > div": {
        marginLeft: "6px",
      },
    },

    toggleCollapsePanel: {
      display: "flex",
      justifyContent: "flex-end",
    },
  }));

export default styles;
