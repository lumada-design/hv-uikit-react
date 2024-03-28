import { forwardRef } from "react";

import { HvButton } from "../Button";
import { useControlled } from "../hooks/useControlled";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";

export interface HvToggleButtonProps
  extends HvBaseProps<HTMLButtonElement, "onClick"> {
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
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    selected: boolean,
  ) => void;
}

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
  } = useDefaultProps("HvToggleButton", props);

  const [isSelected, setIsSelected] = useControlled(
    selected,
    Boolean(defaultSelected),
  );

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(!isSelected);
    onClick?.(event, !isSelected);
  };

  return (
    <HvButton
      ref={ref}
      icon
      aria-pressed={isSelected}
      onClick={onClickHandler}
      {...others}
    >
      {children || (!isSelected ? notSelectedIcon : selectedIcon)}
    </HvButton>
  );
});
