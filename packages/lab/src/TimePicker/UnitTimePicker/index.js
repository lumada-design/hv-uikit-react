import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import styles from "./styles";
import UnitTimePicker from "./UnitTimePicker";

export default withStyles(styles, { name: "HvTimePickerUnitTimePicker" })(
  UnitTimePicker
);
