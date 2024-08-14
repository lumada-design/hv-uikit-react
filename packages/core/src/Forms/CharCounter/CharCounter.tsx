import { useContext } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../../types/generic";
import { HvTypography } from "../../Typography";
import { setId } from "../../utils/setId";
import { HvFormElementContext } from "../FormElement";
import { staticClasses, useClasses } from "./CharCounter.styles";

export { staticClasses as charCounterClasses };

export type HvCharCounterClasses = ExtractNames<typeof useClasses>;

export interface HvCharCounterProps extends HvBaseProps {
  /** The string that separates the current char quantity from the max quantity. */
  separator?: string;
  /** The maximum allowed length of the characters. */
  maxCharQuantity: number;
  /** The current char quantity to be rendered. */
  currentCharQuantity?: number;
  /** If `true` the counter is disabled. */
  disabled?: boolean;
  /** If `true` the info message won't have margins. */
  disableGutter?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCharCounterClasses;
}

/**
 * Displays the capacity and current usage of a text input box (character count by default).
 *
 * Use the character counter when there is a character or word limit.
 * By itself it doesn't block the user from going above the limit.
 */
export const HvCharCounter = (props: HvCharCounterProps) => {
  const {
    separator = "/",
    maxCharQuantity,
    currentCharQuantity = 0,
    classes: classesProp,
    className,
    id,
    disabled,
    disableGutter = false,
    ...others
  } = useDefaultProps("HvCharCounter", props);

  const { classes, cx } = useClasses(classesProp);

  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "counter");
  const currentId = setId(localId, "currentQuantity");
  const maxQuantityId = setId(localId, "maxQuantity");
  const isOverloaded = currentCharQuantity > maxCharQuantity;

  return (
    <div
      id={localId}
      className={cx(
        classes.root,
        {
          [classes.counterDisabled]: !!localDisabled,
          [classes.gutter]: !disableGutter,
        },
        className,
      )}
      aria-live="polite"
      aria-disabled={localDisabled}
      {...others}
    >
      <HvTypography
        id={currentId}
        className={cx({
          [classes.overloaded]: isOverloaded && !localDisabled,
          [classes.counterDisabled]: !!localDisabled,
        })}
        variant="label"
        component="label"
      >
        {currentCharQuantity}
      </HvTypography>
      <HvTypography
        id={maxQuantityId}
        className={cx({
          [classes.overloaded]: isOverloaded && !localDisabled,
          [classes.counterDisabled]: !!localDisabled,
        })}
        variant="body"
        component="label"
      >
        {` ${separator} ${maxCharQuantity}`}
      </HvTypography>
    </div>
  );
};
