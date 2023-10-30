import Tab, { TabProps as MuiTabProps } from "@mui/material/Tab";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Tab.styles";

export { staticClasses as tabClasses };

export type HvTabClasses = ExtractNames<typeof useClasses>;

// Mui Tab props: https://mui.com/material-ui/api/tab/#props
export interface HvTabProps extends Omit<MuiTabProps, "children"> {
  /** If `true`, the tab will be disabled. */
  disabled?: boolean;
  /** The icon element. */
  icon?: React.ReactElement | string;
  /** The label element. */
  label?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPosition?: "bottom" | "end" | "start" | "top";
  /** A Jss Object used to override or extend the component styles. */
  classes?: HvTabClasses;
}

export const HvTab = (props: HvTabProps) => {
  const {
    classes: classesProp,
    iconPosition = "top",
    disabled = false,
    ...others
  } = useDefaultProps("HvTab", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <Tab
      classes={{
        root: classes.root,
        selected: classes.selected,
        disabled: classes.disabled,
      }}
      disableRipple
      disableTouchRipple
      // expose the global class HvIsFocusVisible as a marker
      // not to be styled directly, only as helper in specific css queries
      focusVisibleClassName={cx("HvIsFocusVisible", classes.focusVisible)}
      disabled={disabled}
      iconPosition={iconPosition}
      {...others}
    />
  );
};
