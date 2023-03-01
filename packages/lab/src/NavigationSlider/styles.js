import { makeStyles } from "@mui/styles";

const styles = (props) =>
  makeStyles(() => ({
    container: {
      position: "fixed",
      left: 0,
      top: props.topPosition,
    },
    root: {
      width: props.panelWidth,
      height: `calc(100vh - ${props.topPosition}px)`,
      justifyContent: "flex-start",
    },
    footer: {
      marginTop: "auto",
    },
  }));

export default styles;
