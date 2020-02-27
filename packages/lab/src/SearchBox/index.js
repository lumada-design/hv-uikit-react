import withStyles from "@material-ui/core/styles/withStyles";
import withDeprecate from "@hv/uikit-react-core/dist/withDeprecate";
import styles from "./styles";
import SearchBox from "./SearchBox";

export default withDeprecate(
  withStyles(styles)(SearchBox),
  "This component is deprecated. Please use the Tooltip Component in the Core Package"
);
