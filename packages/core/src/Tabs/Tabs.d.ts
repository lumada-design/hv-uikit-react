import { StandardProps, TabsProps } from "@mui/material";

export type HvTabsClassKey = "root" | "flexContainer" | "indicator" | "scroller";

export interface HvTabsProps extends StandardProps<TabsProps, HvTabsClassKey, "onChange"> {
  /**
   * Explicit re-declaration to workaround MUI typing issue
   * https://github.com/mui-org/material-ui/issues/17454
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
}

export default function HvTabs(props: HvTabsProps): JSX.Element | null;
