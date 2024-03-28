import { Children, cloneElement, isValidElement, useMemo } from "react";

import { HvButtonSize, HvButtonVariant } from "../Button";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import {
  getSplitContainerColor,
  getSplitContainerHeight,
  staticClasses,
  useClasses,
} from "./MultiButton.styles";

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
  /** Button size. */
  size?: HvButtonSize;
  /** Add a split between buttons */
  split?: boolean;
}

export const HvMultiButton = (props: HvMultiButtonProps) => {
  const {
    className,
    children,
    classes: classesProp,
    disabled = false,
    vertical = false,
    variant = "secondarySubtle",
    size,
    split,
    ...others
  } = useDefaultProps("HvMultiButton", props);
  const { classes, cx, css } = useClasses(classesProp);

  const [color, type] = useMemo(() => {
    const result = variant.split(/(?=[A-Z])/);
    if (
      result[0] === "ghost" ||
      result[0] === "semantic" ||
      (result[0] === "secondary" && !result[1])
    )
      return [];
    return result.map((x) => x.toLowerCase());
  }, [variant]);

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.multiple]: !split,
          [classes.vertical]: vertical,
          [classes[variant]]: variant, // TODO - remove in v6
          [classes.splitGroup]: split,
          [classes.splitGroupDisabled]: split && disabled,
        },
        className,
      )}
      {...others}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const childIsSelected = !!child.props.selected;

          return (
            <>
              {cloneElement(child as React.ReactElement, {
                variant,
                disabled: disabled || child.props.disabled,
                size,
                className: cx(child.props.className, classes.button, {
                  [classes.firstButton]: index === 0,
                  [classes.lastButton]: index === Children.count(children) - 1,
                  [classes.selected]: childIsSelected,
                }),
              })}
              {split && index < Children.count(children) - 1 && (
                <div
                  className={cx(
                    classes.splitContainer,
                    color && css(getSplitContainerColor(color, type, disabled)),
                    size && css(getSplitContainerHeight(size)),
                    {
                      [classes.splitDisabled]: disabled,
                    },
                    classes[variant], // TODO - remove in v6
                  )}
                >
                  <div className={classes.split} />
                </div>
              )}
            </>
          );
        }
      })}
    </div>
  );
};
