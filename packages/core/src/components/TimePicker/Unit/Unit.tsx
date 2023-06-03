import { KeyboardEvent } from "react";
import { ClassNames } from "@emotion/react";
import { DateFieldState, DateSegment } from "@react-stately/datepicker";
import {
  DropDownXS as SubtractTimeIcon,
  DropUpXS as AddTimeIcon,
} from "@hitachivantara/uikit-react-icons";
import { HvInput, HvInputProps, HvToggleButton, theme } from "../../..";
import { styles } from "./Unit.styles";

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
  const { type, text } = segment;
  const placeholder = placeholderProp ?? segment.placeholder;

  return (
    <ClassNames>
      {({ css }) => (
        <div className={css(styles.root)}>
          {type !== "literal" && <AddTimeIcon onClick={onAdd} />}
          {type === "literal" && (
            <div className={css(styles.separator)}>{text}</div>
          )}
          {type === "dayPeriod" && (
            <HvToggleButton
              className={css(styles.periodToggle)}
              onClick={onAdd}
            >
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
                input: css(styles.input),
                root: css(styles.inputContainer),
                inputBorderContainer: css(styles.inputBorderContainer),
                inputRoot: css(styles.inputRoot),
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
      )}
    </ClassNames>
  );
};
