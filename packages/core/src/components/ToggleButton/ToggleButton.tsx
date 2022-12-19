import { forwardRef } from "react";

import { Button } from "components";
import { useControlled } from "hooks";
import { HvBaseProps } from "types";

export type ToggleButtonProps = HvBaseProps<HTMLButtonElement, { onClick }> & {
  /** When uncontrolled, defines the initial selected state. */
  defaultSelected?: boolean;
  /** Defines if the button is selected. When defined the button state becomes controlled. */
  selected?: boolean;
  /** Icon for when not selected. Ignored if the component has children. */
  notSelectedIcon?: React.ReactNode;
  /** Icon for when selected. Ignored if the component has children. */
  selectedIcon?: React.ReactNode;
  /** Function called when icon is clicked. */
  onClick?: Function;
};

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (props, ref) => {
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
      <Button
        ref={ref}
        icon
        variant="secondaryGhost"
        aria-pressed={isSelected}
        onClick={onClickHandler}
        {...others}
      >
        {children || (!isSelected ? notSelectedIcon : selectedIcon)}
      </Button>
    );
  }
);
