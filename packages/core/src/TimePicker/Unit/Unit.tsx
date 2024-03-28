import { KeyboardEvent } from "react";
import { DateFieldState, DateSegment } from "@react-stately/datepicker";
import {
  DropUpXS as AddTimeIcon,
  DropDownXS as SubtractTimeIcon,
} from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { HvInput, HvInputProps } from "../../Input";
import { HvToggleButton } from "../../ToggleButton";
import { useClasses } from "./Unit.styles";

interface UnitProps {
  id?: string;
  state: DateFieldState;
  segment: DateSegment;
  placeholder?: string;
  /** Called when the value changes */
  onChange?: HvInputProps["onChange"];
  /** Called when the up/add arrow is pressed */
  onAdd?: () => void;
  /** Called when the down/subtract arrow is pressed */
  onSub?: () => void;
}

export const Unit = ({
  id,
  state,
  segment,
  placeholder: placeholderProp,
  onChange,
  onAdd,
  onSub,
}: UnitProps) => {
  const { classes } = useClasses();
  const { type, text } = segment;
  const placeholder = placeholderProp ?? segment.placeholder;

  return (
    <div className={classes.root}>
      {type !== "literal" && <AddTimeIcon onClick={onAdd} />}
      {type === "literal" && <div className={classes.separator}>{text}</div>}
      {type === "dayPeriod" && (
        <HvToggleButton className={classes.periodToggle} onClick={onAdd}>
          {text}
        </HvToggleButton>
      )}
      {["hour", "minute", "second"].includes(type) && (
        <HvInput
          id={id}
          disableClear
          style={{
            ...theme.typography.title3,
          }}
          classes={{
            input: classes.input,
            root: classes.inputContainer,
            inputBorderContainer: classes.inputBorderContainer,
            inputRoot: classes.inputRoot,
          }}
          onKeyDown={(event) => {
            if ((event as KeyboardEvent).key === "Enter") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          required
          status={state.validationState}
          value={text.padStart(2, "0")}
          onChange={onChange}
          placeholder={placeholder}
          inputProps={{ autoComplete: "off", type: "number" }}
        />
      )}
      {type !== "literal" && <SubtractTimeIcon onClick={onSub} />}
    </div>
  );
};
