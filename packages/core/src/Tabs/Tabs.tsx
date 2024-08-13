import Tabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { staticClasses, useClasses } from "./Tabs.styles";

export { staticClasses as tabsClasses };

export type HvTabsClasses = ExtractNames<typeof useClasses>;

// Mui Tabs props: https://mui.com/material-ui/api/tabs/#props
export interface HvTabsProps extends Omit<MuiTabsProps, "onChange"> {
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
  /** @ignore */
  ref?: MuiTabsProps["ref"];
  /** @ignore */
  component?: MuiTabsProps["component"];
}

/**
 * A Tab is a graphical control element that allows multiple documents or panels to be contained within a single window.
 * Tabs can be used as a navigational widget for switching between sets of documents.
 */
export const HvTabs = (props: HvTabsProps) => {
  const { classes: classesProp, ...others } = useDefaultProps("HvTabs", props);

  const { classes } = useClasses(classesProp);

  return (
    <Tabs
      classes={{
        root: classes.root,
        flexContainer: classes.flexContainer,
        indicator: classes.indicator,
        scroller: classes.scroller,
      }}
      TabIndicatorProps={{ children: <div /> }}
      {...others}
    />
  );
};
