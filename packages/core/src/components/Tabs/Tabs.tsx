import { TabsProps as MuiTabsProps } from "@mui/material";
import { HvBaseProps } from "@core/types";
import { StyledTabs } from "./Tabs.styles";
import tabsClasses, { HvTabsClasses } from "./tabsClasses";
import { clsx } from "clsx";

// Mui Tabs props: https://mui.com/material-ui/api/tabs/#props
export interface HvTabsProps
  extends MuiTabsProps,
    HvBaseProps<HTMLButtonElement, "onChange"> {
  /**
   * The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to `false`.
   */
  value?: any;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvTabsClasses;
}

/**
 * A Tab is a graphical control element that allows multiple documents or panels to be contained within a single window.
 * Tabs can be used as a navigational widget for switching between sets of documents.
 */
export const HvTabs = ({ classes, ...others }: HvTabsProps) => {
  return (
    <StyledTabs
      classes={{
        root: clsx(tabsClasses.root, classes?.root),
        flexContainer: clsx(tabsClasses.flexContainer, classes?.flexContainer),
        indicator: clsx(tabsClasses.indicator, classes?.indicator),
        scroller: clsx(tabsClasses.scroller, classes?.scroller),
      }}
      TabIndicatorProps={{ children: <div /> }}
      {...others}
    />
  );
};
