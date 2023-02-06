import { useContext } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { HvBaseProps } from "../../../types";
import { StyledRoot, StyledTypography, StyledIcon } from "./WarningText.styles";
import { HvFormElementContext } from "../FormElement";
import { setId } from "utils";
import warningTextClasses, { HvWarningTextClasses } from "./warningTextClasses";

export type HvWarningTextProps = HvBaseProps & {
  /** Icon to be rendered alongside the warning text. */
  adornment?: React.ReactNode;
  /** If `true` the text is not rendered. */
  isVisible?: boolean;
  /** If `true` the text is disabled. */
  disabled?: boolean;
  /** If `true` the text won't include a gutter. */
  disableGutter?: boolean;
  /** If `true` the text won't include the top border. */
  disableBorder?: boolean;
  /** If `true` the adornment icon isn't shown. */
  disableAdornment?: boolean;
  /** If `true` the text isn't shown. */
  hideText?: boolean;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvWarningTextClasses;
};

/**
 * Provides the user with a descriptive text, signaling an error, for when the form element is in an invalid state.
 */
export const HvWarningText = ({
  children,
  adornment,
  isVisible,
  classes,
  className,
  id,
  disabled,
  disableGutter = false,
  disableBorder = false,
  disableAdornment = false,
  hideText = false,
  ...others
}: HvWarningTextProps) => {
  const { elementId, elementStatus, elementDisabled } =
    useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localVisible = !isNil(isVisible)
    ? isVisible
    : elementStatus === "invalid";
  const localId = id ?? setId(elementId, "error");
  const showWarning = localVisible && !localDisabled;
  const content = showWarning ? children : "";
  const localAdornment = adornment || (
    <StyledIcon
      className={clsx(warningTextClasses.defaultIcon, classes?.defaultIcon)}
      semantic="sema4"
    />
  );

  return (
    <StyledRoot
      className={clsx(
        className,
        warningTextClasses.root,
        classes?.root,
        showWarning && clsx(warningTextClasses.show, classes?.show),
        !disableBorder && clsx(warningTextClasses.topBorder, classes?.topBorder)
      )}
      $show={showWarning}
      $topBorder={!disableBorder}
    >
      {!disableAdornment && localAdornment}
      <StyledTypography
        id={localId}
        className={clsx(
          warningTextClasses.warningText,
          classes?.warningText,
          !disableGutter &&
            clsx(warningTextClasses.topGutter, classes?.topGutter),
          hideText && clsx(warningTextClasses.hideText, classes?.hideText)
        )}
        $topGutter={!disableGutter}
        $hideText={hideText}
        role="status"
        aria-relevant="additions text"
        {...others}
      >
        {showWarning && content}
      </StyledTypography>
    </StyledRoot>
  );
};
