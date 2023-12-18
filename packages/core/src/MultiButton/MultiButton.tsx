import React, { cloneElement } from "react";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvButtonVariant } from "@core/Button";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./MultiButton.styles";

export { staticClasses as multiButtonClasses };
export type HvMultiButtonClasses = ExtractNames<typeof useClasses>;

export interface HvMultiButtonProps extends HvBaseProps {
  /** If all the buttons are disabled. */
  disabled?: boolean;
  /** If the MultiButton is to be displayed vertically. */
  vertical?: boolean;
  /** Category of button to use */
  variant?: HvButtonVariant;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvMultiButtonClasses;
}

export const HvMultiButton = (props: HvMultiButtonProps) => {
  const {
    className,
    children,
    classes: classesProp,
    disabled = false,
    vertical = false,
    variant = "secondarySubtle",
    ...others
  } = useDefaultProps("HvMultiButton", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.vertical]: vertical,
        },
        className
      )}
      {...others}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childIsSelected = !!child.props.selected;

          return cloneElement(child as React.ReactElement, {
            variant,
            disabled: disabled || child.props.disabled,
            className: cx(child.props.className, classes.button, {
              [classes.selected]: childIsSelected,
            }),
            "aria-pressed": childIsSelected,
          });
        }
      })}
    </div>
  );
};
