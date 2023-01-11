import { TabProps as MuiTabProps } from "@mui/material";
import clsx from "clsx";
import { HvBaseProps } from "types";
import { StyledTab } from "./Tab.styles";

// Mui Tab props: https://mui.com/material-ui/api/tab/#props
export type HvTabProps = Omit<MuiTabProps, "children"> &
  HvBaseProps<HTMLDivElement, { children }> & {
    /**
     * If `true`, the tab will be disabled.
     */
    disabled?: boolean;
    /**
     * The icon element.
     */
    icon?: React.ReactElement | string;
    /**
     * The label element.
     */
    label?: React.ReactNode;
    /**
     * The position of the icon relative to the label.
     */
    iconPosition?: "bottom" | "end" | "start" | "top";
    /**
     * A Jss Object used to override or extend the component styles.
     */
    classes?: {
      root?: string;
      selected?: string;
      disabled?: string;
      focusVisible?: string;
    };
  };

export const HvTab = ({
  classes,
  iconPosition = "top",
  disabled = false,
  ...others
}: HvTabProps) => {
  return (
    <StyledTab
      classes={{
        root: classes?.root,
        selected: classes?.selected,
        disabled: classes?.disabled,
      }}
      disableRipple
      disableTouchRipple
      // Exposes the global class HvIsFocusVisible as a marker not to
      // be styled directly, but only as helper in specific css queries
      focusVisibleClassName={clsx("HvIsFocusVisible", classes?.focusVisible)}
      disabled={disabled}
      iconPosition={iconPosition}
      {...others}
    />
  );
};
