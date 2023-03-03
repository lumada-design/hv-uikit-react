import { forwardRef } from "react";
import { HvButton } from "components";
import { useControlled } from "hooks";
import { HvBaseProps } from "../../types";

export type HvToggleButtonProps = HvBaseProps<
  HTMLButtonElement,
  { onClick }
> & {
  /** When uncontrolled, defines the initial selected state. */
  defaultSelected?: boolean;
  /** Defines if the button is selected. When defined the button state becomes controlled. */
  selected?: boolean;
  /** Defines if the button is disabled. */
  disabled?: boolean;
  /** Icon for when not selected. Ignored if the component has children. */
  notSelectedIcon?: React.ReactNode;
  /** Icon for when selected. Ignored if the component has children. */
  selectedIcon?: React.ReactNode;
  /** Function called when icon is clicked. */
  onClick?: Function;
};

export const HvToggleButton = forwardRef<
  HTMLButtonElement,
  HvToggleButtonProps
>((props, ref) => {
  const {
    defaultSelected,
    selected,
    notSelectedIcon,
    selectedIcon = null,
    onClick,
    children,
    ...others
  } = props;

  const [isSelected, setIsSelected] = useControlled(
    selected,
    Boolean(defaultSelected)
  );

  const onClickHandler = (e) => {
    setIsSelected(!isSelected);
    onClick?.(e, !isSelected);
  };

  return (
    <HvButton
      ref={ref}
      icon
      variant="secondaryGhost"
      aria-pressed={isSelected}
      onClick={onClickHandler}
      {...others}
    >
      {children || (!isSelected ? notSelectedIcon : selectedIcon)}
    </HvButton>
  );
});
