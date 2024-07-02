import { useState } from "react";
import { Tab } from "@mui/base/Tab";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import {
  ExtractNames,
  HvBaseProps,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./CanvasTabs.styles";

export { staticClasses as canvasTabsClasses };

export type HvCanvasTabsClasses = ExtractNames<typeof useClasses>;

export type HvCanvasTab = {
  id: string;
  content: React.ReactNode;
};

export interface HvCanvasTabsProps
  extends Omit<HvBaseProps<HTMLDivElement>, "onChange"> {
  /** The list of tabs. */
  tabs?: HvCanvasTab[];
  /** Event handler to run when a tab is clicked. */
  onChange: (tabId: string) => void;
  /* The content that will be rendered within the blade. */
  children?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasTabsClasses;
}

/**
 *
 */
export const HvCanvasTabs = (props: HvCanvasTabsProps) => {
  const {
    tabs,
    onChange,
    className,
    classes: classesProp,
  } = useDefaultProps("HvCanvasTabs", props);

  const { classes, cx } = useClasses(classesProp);

  const [selectedTab, setSelectedTab] = useState<string>(
    tabs?.[0]?.id || "none",
  );

  const handleTabChange = (_, value) => {
    onChange?.(value);
    setSelectedTab(value);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      className={cx(classes.root, className)}
      selectionFollowsFocus
    >
      <TabsList className={classes.list}>
        {tabs?.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            className={cx(
              classes.tab,
              tab.id === selectedTab ? "selected" : "",
            )}
            onChange={handleTabChange}
            tabIndex={0}
          >
            {tab.content}
          </Tab>
        ))}
      </TabsList>
    </Tabs>
  );
};
