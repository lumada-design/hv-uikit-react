import { DateSegment } from "@react-stately/datepicker";
import clsx from "clsx";
import {
  DropDownXS as SubtractTimeIcon,
  DropUpXS as AddTimeIcon,
} from "@hitachivantara/uikit-react-icons";
import { HvInput, HvInputProps, HvToggleButton } from "../../..";

export interface UnitTimePickerProps extends DateSegment {
  id?: string;
  classes?: any;
  /** Called when the value changes */
  onChange?: HvInputProps["onChange"];
  /** Called when the up/add arrow is pressed */
  onAdd?: () => void;
  /** Called when the down/subtract arrow is pressed */
  onSub?: () => void;
}

export const UnitTimePicker = ({
  id,
  classes = {},
  placeholder,
  type,
  // value,
  text,
  minValue,
  maxValue,
  onChange,
  onAdd,
  onSub,
}: UnitTimePickerProps) => {
  const isValid = true; // TODO

  const isTimeSegment = ["hour", "minute", "second"].includes(type);

  if (type === "literal") {
    return <div className={classes.separator}>{text}</div>;
  }

  // TODO: font 22px

  return (
    <div className={classes.unitTimeContainer}>
      <AddTimeIcon onClick={onAdd} />
      {type === "dayPeriod" && (
        <HvToggleButton
          className={classes.periodToggle}
          onClick={onChange as any}
        >
          {text}
        </HvToggleButton>
      )}
      {isTimeSegment && (
        <HvInput
          id={id}
          disableClear
          classes={{
            input: classes.unitTimeInput,
            root: classes.inputContainer,
            inputBorderContainer: classes.inputBorderContainer,
            inputRoot: clsx(classes.unitTimeInputRoot),
          }}
          required
          status={isValid ? "valid" : "invalid"}
          value={text}
          onChange={onChange}
          placeholder={placeholder}
          inputProps={{
            autoComplete: "off",
            type: "number",
            min: minValue,
            max: maxValue,
          }}
        />
      )}
      <SubtractTimeIcon onClick={onSub} />
    </div>
  );
};
