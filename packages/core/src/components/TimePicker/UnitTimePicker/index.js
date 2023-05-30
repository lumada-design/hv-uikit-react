import { withStyles } from "@mui/styles";
import styles from "./styles";
import UnitTimePicker from "./UnitTimePicker";

export default withStyles(styles, { name: "HvTimePickerUnitTimePicker" })(
  UnitTimePicker
);
