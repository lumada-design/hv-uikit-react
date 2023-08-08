import { useContext } from "react";

import isNil from "lodash/isNil";

import { Fail } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps } from "@core/types/generic";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";
import { HvTypography } from "@core/components/Typography";

import { staticClasses, useClasses } from "./WarningText.styles";
import { HvFormElementContext } from "../FormElement";

export { staticClasses as warningTextClasses };

export type HvWarningTextClasses = ExtractNames<typeof useClasses>;

export interface HvWarningTextProps extends HvBaseProps {
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
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvWarningTextClasses;
}

/**
 * Provides the user with a descriptive text, signaling an error, for when the form element is in an invalid state.
 */
export const HvWarningText = (props: HvWarningTextProps) => {
  const {
    children,
    adornment,
    isVisible,
    classes: classesProp,
    className,
    id,
    disabled,
    disableGutter = false,
    disableBorder = false,
    disableAdornment = false,
    hideText = false,
    ...others
  } = useDefaultProps("HvWarningText", props);

  const { classes, cx } = useClasses(classesProp);

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
    <Fail className={classes.defaultIcon} semantic="negative" />
  );

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.show]: showWarning,
          [classes.topBorder]: !disableBorder,
        },
        className
      )}
    >
      {!disableAdornment && localAdornment}
      <HvTypography
        id={localId}
        className={cx(classes.warningText, {
          [classes.topGutter]: !disableGutter,
          [classes.hideText]: hideText,
        })}
        role="status"
        aria-relevant="additions text"
        {...others}
      >
        {showWarning && content}
      </HvTypography>
    </div>
  );
};
