import { useState } from "react";
import { Tab } from "@mui/base/Tab";
import { Tabs, TabsProps } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./Tabs.styles";

export { staticClasses as canvasTabsClasses };

export type HvCanvasTabsClasses = ExtractNames<typeof useClasses>;

export interface HvCanvasTab {
  id: string;
  content: React.ReactNode;
}

export interface HvCanvasTabsProps extends Omit<TabsProps, "onChange"> {
  /** List of tabs. */
  tabs: HvCanvasTab[];
  /** Event handler triggered when a tab is clicked. */
  onChange?: (event: React.SyntheticEvent | null, tabId: string) => void;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasTabsClasses;
}

/**
 * A tabs component to use in a canvas context.
 */
export const HvCanvasTabs = (props: HvCanvasTabsProps) => {
  const {
    tabs,
    onChange,
    className,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvCanvasTabs", props);

  const { classes, cx } = useClasses(classesProp);

  const [selectedTab, setSelectedTab] = useState(tabs?.[0]?.id || "none");

  const handleTabChange: TabsProps["onChange"] = (event, value) => {
    onChange?.(event, value as string);
    setSelectedTab(value as string);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      className={cx(classes.root, className)}
      selectionFollowsFocus
      {...others}
    >
      <TabsList className={classes.list}>
        {tabs?.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            className={cx(classes.tab, {
              [classes.selected]: tab.id === selectedTab,
            })}
            tabIndex={0}
          >
            {tab.content}
          </Tab>
        ))}
      </TabsList>
    </Tabs>
  );
};
