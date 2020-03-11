import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import Slider from "./Slider";

export default withStyles(styles, { name: "HvSlider", withTheme: true })(Slider);
