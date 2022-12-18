import clsx from "clsx";
import React, { cloneElement } from "react";

import { BaseProps } from "types";
import { ButtonVariant } from "components";
import { StyledButton, StyledRoot } from "./MultiButton.styles";

export interface MultiButtonProps extends BaseProps {
  /** If all the buttons are disabled. */
  disabled?: boolean;
  /** If the MultiButton is to be displayed vertically. */
  vertical?: boolean;
  /** Category of button to use */
  variant?: ButtonVariant;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    button?: string;
  };
}

export const MultiButton = ({
  className,
  children,
  classes,
  disabled = false,
  vertical = false,
  variant = "secondarySubtle",
  ...others
}: MultiButtonProps) => {
  return (
    <StyledRoot
      className={clsx(className, classes?.root)}
      vertical={vertical}
      {...others}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childIsSelected = !!child.props.selected;
          const btn = cloneElement(child as React.ReactElement, {
            variant,
            disabled: disabled || child.props.disabled,
            "aria-pressed": childIsSelected,
          });
          const StyledBtn = StyledButton(btn);
          return React.createElement(StyledBtn);
        }
      })}
    </StyledRoot>
  );
};
