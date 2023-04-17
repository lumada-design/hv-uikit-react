import { HvBaseSwitch, HvBaseSwitchProps } from "~/components";
import { StyledYes, StyledNo } from "./SwitchColumnCell.styles";

export interface HvSwitchColumnCellProp {
  /** Whether the switch is checked or not. */
  checked: boolean;
  /** The switch label. */
  value: number | string | undefined;
  /** The value of the switch. */
  switchLabel: string;
  /** The right switch label. */
  falseLabel?: string;
  /** The left switch label. */
  trueLabel?: string;
  /** Extra props to be passed to the switch. */
  switchProps?: HvBaseSwitchProps;
}

const HvSwitchColumnCell = ({
  checked,
  value,
  switchLabel,
  falseLabel,
  trueLabel,
  switchProps,
}: HvSwitchColumnCellProp): JSX.Element => {
  return (
    <>
      {falseLabel != null && (
        <StyledNo aria-hidden="true" variant="body">
          {falseLabel}
        </StyledNo>
      )}
      <HvBaseSwitch
        aria-label={switchLabel}
        checked={checked}
        value={value}
        {...switchProps}
      />
      {trueLabel != null && (
        <StyledYes aria-hidden="true" variant="body">
          {trueLabel}
        </StyledYes>
      )}
    </>
  );
};

export default HvSwitchColumnCell;
