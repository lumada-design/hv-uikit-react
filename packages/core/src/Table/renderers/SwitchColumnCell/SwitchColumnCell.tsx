import { HvBaseSwitch, HvBaseSwitchProps } from "../../../BaseSwitch";
import { HvTypography } from "../../../Typography";
import { useClasses } from "./SwitchColumnCell.styles";

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

export const HvSwitchColumnCell = ({
  checked,
  value,
  switchLabel,
  falseLabel,
  trueLabel,
  switchProps,
}: HvSwitchColumnCellProp): JSX.Element => {
  const { classes } = useClasses();

  return (
    <>
      {falseLabel != null && (
        <HvTypography
          aria-hidden="true"
          variant="body"
          className={classes.switchNo}
        >
          {falseLabel}
        </HvTypography>
      )}
      <HvBaseSwitch
        checked={checked}
        value={value}
        {...switchProps}
        inputProps={{ "aria-label": switchLabel, ...switchProps?.inputProps }}
      />
      {trueLabel != null && (
        <HvTypography
          aria-hidden="true"
          variant="body"
          className={classes.switchYes}
        >
          {trueLabel}
        </HvTypography>
      )}
    </>
  );
};
