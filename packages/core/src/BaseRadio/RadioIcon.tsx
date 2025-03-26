import {
  createClasses,
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { SvgBase } from "../icons";
import type { HvBaseRadioProps } from "./BaseRadio";

const { useClasses } = createClasses("HvRadioIcon", {
  root: {
    borderRadius: theme.radii.full,
    border: `1px solid ${theme.colors.borderStrong}`,
    backgroundColor: theme.colors.bgContainer,
  },
  checked: {
    borderColor: "transparent",
    backgroundColor: theme.colors.primaryStrong,
    color: theme.colors.bgContainer,
  },
  disabled: {
    borderColor: theme.colors.textDisabled,
    backgroundColor: theme.colors.bgDisabled,
  },
  checkedDisabled: {
    borderColor: "transparent",
    backgroundColor: theme.colors.borderDisabled,
    color: theme.colors.bgDisabled,
  },
});

export type HvRadioIconClasses = ExtractNames<typeof useClasses>;

export interface HvRadioIconProps
  extends Pick<HvBaseRadioProps, "checked" | "disabled" | "className"> {
  classes?: HvRadioIconClasses;
}

export const HvRadioIcon = (props: HvRadioIconProps) => {
  const {
    className,
    classes: classesProp,
    checked,
    disabled,
  } = useDefaultProps("HvRadioIcon", props);
  const { classes, cx } = useClasses(classesProp, false);

  return (
    <SvgBase
      viewBox="0 0 16 16"
      className={cx(classes.root, className, {
        [classes.checked]: checked,
        [classes.disabled]: disabled,
        [classes.checkedDisabled]: checked && disabled,
      })}
    >
      {checked && <circle cx="8" cy="8" r="4.5" />}
    </SvgBase>
  );
};
