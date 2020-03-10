import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import styles from "./styles";
import Slider from "./Slider";

export default withStyles(styles, { name: "HvSlider", withTheme: true })(
  Slider
);
