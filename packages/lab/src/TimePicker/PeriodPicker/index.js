import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import styles from "./styles";
import PeriodPicker from "./PeriodPicker";

export default withStyles(styles, { name: "HvTimePickerPeriodPicker" })(
  PeriodPicker
);
