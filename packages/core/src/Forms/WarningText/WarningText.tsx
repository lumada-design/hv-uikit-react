import { useContext } from "react";
import { Fail } from "@hitachivantara/uikit-react-icons";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../../types/generic";
import { HvTypography } from "../../Typography";
import { setId } from "../../utils/setId";
import { HvFormElementContext } from "../FormElement";
import { staticClasses, useClasses } from "./WarningText.styles";

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
    adornment: adornmentProp,
    isVisible: isVisibleProp,
    classes: classesProp,
    className,
    id: idProp,
    disabled: disabledProp,
    disableGutter = false,
    disableBorder = false,
    disableAdornment = false,
    hideText = false,
    ...others
  } = useDefaultProps("HvWarningText", props);

  const { classes, cx } = useClasses(classesProp);

  const { elementId, elementStatus, elementDisabled } =
    useContext(HvFormElementContext);
  const disabled = disabledProp || elementDisabled;
  const visible = isVisibleProp ?? elementStatus === "invalid";
  const id = idProp ?? setId(elementId, "error");
  const showWarning = visible && !disabled;
  const adornment = adornmentProp || (
    <Fail size="xs" className={classes.defaultIcon} />
  );

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.show]: showWarning,
          [classes.topBorder]: !disableBorder,
        },
        className,
      )}
    >
      {!disableAdornment && adornment}
      <HvTypography
        id={id}
        className={cx(classes.warningText, {
          [classes.topGutter]: !disableGutter,
          [classes.hideText]: hideText,
        })}
        variant="caption1"
        role="status"
        aria-live="polite"
        aria-relevant="additions text"
        {...others}
      >
        {showWarning && children}
      </HvTypography>
    </div>
  );
};
