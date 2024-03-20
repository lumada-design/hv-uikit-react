import { forwardRef } from "react";
import type { Placement } from "@popperjs/core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";

import { HvButton, HvButtonProps } from "../Button";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";
import { staticClasses, useClasses } from "./DropdownButton.styles";

export { staticClasses as dropdownButtonClasses };

export type HvDropdownButtonClasses = ExtractNames<typeof useClasses>;

export interface HvDropdownButtonProps
  extends Omit<HvButtonProps, "startAdornment" | "endAdornment" | "classes"> {
  /** Whether the button is in read only mode when used as a form element. */
  readOnly?: boolean;
  /** Whether the content triggered by the button is opened or not. */
  open?: boolean;
  /** Placement of the content triggered by the button. @default bottom */
  placement?: Placement;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvDropdownButtonClasses;
}

/**
 * IMPORTANT: This component is not ready to be exported to external users.
 *
 * Implements the DS dropdown button pattern.
 */
export const HvDropdownButton = forwardRef<
  HTMLButtonElement,
  HvDropdownButtonProps
>((props, ref) => {
  const {
    className,
    classes: classesProp,
    placement = "bottom",
    disabled,
    open,
    icon,
    readOnly,
    children,
    variant,
    ...others
  } = useDefaultProps("HvDropdownButton", props);

  const { classes, cx } = useClasses(classesProp);

  const endIcon = icon ? undefined : (
    <DropDownXS
      iconSize="XS"
      style={{ rotate: open ? "180deg" : undefined }}
      className={classes.arrow}
    />
  );

  return (
    <HvButton
      ref={ref}
      icon={icon}
      disabled={disabled || readOnly}
      className={cx(
        classes.root,
        {
          [classes.open]: open,
          [classes.openUp]: open && placement.includes("top"),
          [classes.openDown]: open && placement.includes("bottom"),
          [classes.disabled]: disabled,
          [classes.readOnly]: readOnly,
        },
        className
      )}
      classes={{ endIcon: classes.arrowContainer }}
      endIcon={endIcon}
      variant={open ? "secondarySubtle" : variant}
      {...others}
    >
      <div className={cx({ [classes.selection]: !icon })}>
        {children && typeof children === "string" ? (
          <div className={classes.placeholder}>{children}</div>
        ) : (
          children
        )}
      </div>
    </HvButton>
  );
});
