import { useContext } from "react";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledRoot, StyledTypography } from "./CharCounter.styles";
import { setId } from "../../../utils";
import { HvFormElementContext } from "../FormElement";
import { charCounterClasses, HvCharCounterClasses } from ".";

export type HvCharCounterProps = HvBaseProps & {
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
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvCharCounterClasses;
};

/**
 * Displays the capacity and current usage of a text input box (character count by default).
 *
 * Use the character counter when there is a character or word limit.
 * By itself it doesn't block the user from going above the limit.
 */
export const HvCharCounter = ({
  separator = "/",
  maxCharQuantity,
  currentCharQuantity = 0,
  classes,
  className,
  id,
  disabled,
  disableGutter = false,
  ...others
}: HvCharCounterProps) => {
  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "counter");
  const currentId = setId(localId, "currentQuantity");
  const maxQuantityId = setId(localId, "maxQuantity");
  const isOverloaded = currentCharQuantity > maxCharQuantity;

  return (
    <StyledRoot
      id={localId}
      className={clsx(
        className,
        charCounterClasses.root,
        classes?.root,
        localDisabled &&
          clsx(charCounterClasses.counterDisabled, classes?.counterDisabled),
        !disableGutter && clsx(charCounterClasses.gutter, classes?.gutter)
      )}
      $counterDisabled={!!localDisabled}
      $gutter={!disableGutter}
      aria-live="polite"
      aria-disabled={localDisabled}
      {...others}
    >
      <StyledTypography
        id={currentId}
        className={clsx(
          isOverloaded &&
            !localDisabled &&
            clsx(charCounterClasses.overloaded, classes?.overloaded),
          localDisabled &&
            clsx(charCounterClasses.counterDisabled, classes?.counterDisabled)
        )}
        variant="label"
        as="label"
        $overloaded={isOverloaded && !localDisabled}
        $counterDisabled={!!localDisabled}
      >
        {currentCharQuantity}
      </StyledTypography>
      <StyledTypography
        id={maxQuantityId}
        className={clsx(
          isOverloaded &&
            !localDisabled &&
            clsx(charCounterClasses.overloaded, classes?.overloaded),
          localDisabled &&
            clsx(charCounterClasses.counterDisabled, classes?.counterDisabled)
        )}
        variant="body"
        as="label"
        $overloaded={isOverloaded && !localDisabled}
        $counterDisabled={!!localDisabled}
      >
        {` ${separator} ${maxCharQuantity}`}
      </StyledTypography>
    </StyledRoot>
  );
};
