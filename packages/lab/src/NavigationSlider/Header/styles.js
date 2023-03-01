import { makeStyles } from "@mui/styles";

const styles = (props) =>
  makeStyles((theme) => ({
    menuContainer: {
      display: "grid",
      gridTemplateColumns: "min-content auto",
      minHeight: props.headerHeight,
      boxShadow: "inset 0 5px 5px -3px rgb(65 65 65 / 12%)",
    },
    button: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: theme.hv.spacing.sm,
      padding: theme.hvSpacing(0, "xs"),
    },
    justifyContentCenter: { justifyContent: "center" },
  }));

export default styles;
