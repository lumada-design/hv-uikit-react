import { makeStyles } from "@mui/styles";
import { theme } from "@hitachivantara/uikit-react-core";

const styles = makeStyles({
  section: { marginBottom: theme.space.xs },
  footer: {
    width: "100%",
    height: 80,
    backgroundColor: theme.colors.atmo1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: theme.space.sm,
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: 2,
  },
  link: {
    textDecoration: "underline",
    color: theme.colors.primary,
  },
});

export default styles;
