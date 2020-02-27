import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import NavigationAnchors from "./NavigationAnchors";

export default withStyles(styles, { name: "HvNavigationAnchors" })(
  NavigationAnchors
);
