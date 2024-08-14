import { forwardRef, useCallback, useMemo, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import {
  ExtractNames,
  HvBaseProps,
  HvButton,
  HvButtonProps,
  HvDropDownMenu,
  HvOverflowTooltip,
  HvTypography,
  uniqueId,
  useControlled,
  useDefaultProps,
  useForkRef,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import {
  AddAlt,
  CloseXS,
  MoreOptionsHorizontal,
} from "@hitachivantara/uikit-react-icons";

import { HvCanvasPanelTab } from "../PanelTab";
import { HvCanvasPanelTabs, HvCanvasPanelTabsProps } from "../PanelTabs";
import { MIN_TAB_WIDTH, staticClasses, useClasses } from "./ToolbarTabs.styles";

export { staticClasses as canvasToolbarTabsClasses };

export type HvCanvasToolbarTabsClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  create: "Create new",
  undefined: "Undefined",
  close: "Close",
  dropdownMenu: "Dropdown menu",
};

interface ToolbarTabsTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface HvCanvasToolbarTabsProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
  /** When controlled, defines the tabs. */
  tabs?: ToolbarTabsTab[];
  /** When uncontrolled, defines the initial tabs. */
  defaultTabs?: ToolbarTabsTab[];
  /** Id of the selected tab if it needs to be controlled. */
  selectedTabId?: string;
  /** Defines the icon to be placed before the label when a new tab is created. If not defined, no icon is used. */
  icon?: React.ReactNode;
  /** Defines whether or not the tabs are editable. */
  allowTabEdit?: boolean;
  /** Callback triggered when a tab changes/is clicked. */
  onTabChange?: (
    event: React.SyntheticEvent | null,
    tabId: string | null,
  ) => void;
  /** Callback triggered when the tabs change: new tab added, tab removed, tab reorder, and label updated. */
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent,
    tabs: ToolbarTabsTab[],
  ) => void;
  /** An object containing all the labels. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasToolbarTabsClasses;
}

interface GroupedTabs {
  hiddenTabs: ToolbarTabsTab[];
  visibleTabs: ToolbarTabsTab[];
}

const DROPDOWN_MENU_WIDTH = 64;
const BORDER_WIDTH = 2;

/**
 * A toolbar tabs component to use in a canvas context.
 */
export const HvCanvasToolbarTabs = forwardRef<
  HTMLDivElement,
  HvCanvasToolbarTabsProps
>((props, ref) => {
  const {
    children,
    className,
    selectedTabId: selectedTabIdProp,
    icon: iconProp,
    allowTabEdit = true,
    tabs: tabsProp,
    defaultTabs: defaultTabsProp = [],
    labels: labelsProp,
    classes: classesProp,
    onTabChange: onTabChangeProp,
    onChange: onChangeProp,
    ...others
  } = useDefaultProps("HvCanvasToolbarTabs", props);

  const { classes, cx } = useClasses(classesProp);

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  // Tab resize detector: to know when to use the dropdown menu
  const { width: tabWidth = 0, ref: tabRef } = useResizeDetector({
    handleHeight: false,
    refreshMode: "debounce",
    refreshOptions: {
      leading: true,
    },
  });

  // Actions resize detector: to know when to use the dropdown menu
  const { width: actionsWidth = 0, ref: actionsRef } = useResizeDetector({
    handleHeight: false,
  });

  // Root resize detector: to know when to use the dropdown menu
  const { width: rootWidth = 0, ref: rootRef } = useResizeDetector({
    handleHeight: false,
  });

  const [tabs, setTabs] = useControlled(tabsProp, defaultTabsProp);
  const [selectedTab, setSelectedTab] = useControlled<string | null>(
    selectedTabIdProp,
    tabs?.[0]?.id ?? "none",
  );

  const rootWidthLimitReached = useRef(false);

  // TODO - REVIEW THE LOGIC TO ADD THE DROPDOWN
  const groupTabs = useCallback(
    (allTabs: ToolbarTabsTab[]): GroupedTabs => {
      let fullTabWidth = MIN_TAB_WIDTH;

      const rootScrollWidth = rootRef.current?.scrollWidth ?? 0;
      if (rootScrollWidth - rootWidth >= 1 || rootWidthLimitReached.current) {
        fullTabWidth = tabWidth + BORDER_WIDTH;
        rootWidthLimitReached.current = true;
      }

      const totalWidth = allTabs.length * fullTabWidth + DROPDOWN_MENU_WIDTH;

      if (tabWidth > 0 && totalWidth > rootWidth - actionsWidth) {
        const visibleCount = Math.floor(
          (rootWidth - actionsWidth - DROPDOWN_MENU_WIDTH) / fullTabWidth,
        );
        const temporaryHiddenTabs = allTabs.slice(visibleCount);
        const selectedTabHiddenIndex = temporaryHiddenTabs.findIndex(
          (tab) => tab.id === selectedTab,
        );
        const excludedTabIndex = visibleCount - 1;
        const shouldShuffle = selectedTabHiddenIndex !== -1 && visibleCount > 0;

        if (shouldShuffle) {
          return {
            visibleTabs: [
              ...tabs.slice(0, excludedTabIndex),
              temporaryHiddenTabs[selectedTabHiddenIndex],
            ].filter((tab) => tab),
            hiddenTabs: [
              tabs[excludedTabIndex],
              ...temporaryHiddenTabs.filter(
                (tab, i) => i !== selectedTabHiddenIndex,
              ),
            ].filter((tab) => tab),
          };
        }
        return {
          visibleTabs: tabs.slice(0, visibleCount),
          hiddenTabs: temporaryHiddenTabs,
        };
      }
      return {
        visibleTabs: allTabs,
        hiddenTabs: [],
      };
    },
    [actionsWidth, rootRef, rootWidth, selectedTab, tabWidth, tabs],
  );

  const { hiddenTabs, visibleTabs } = useMemo(
    () => groupTabs(tabs),
    [groupTabs, tabs],
  );

  const rootForkedRef = useForkRef(ref, rootRef);

  const handleChangeTabs = (
    event: React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent,
    newTabs: ToolbarTabsTab[],
  ) => {
    setTabs(newTabs);
    onChangeProp?.(event, newTabs);
  };

  const handleChangeSelectedTab: HvCanvasPanelTabsProps["onChange"] = (
    event,
    value,
  ) => {
    setSelectedTab(String(value));
    onTabChangeProp?.(event, String(value));
  };

  const handleCreateNew: HvButtonProps["onClick"] = (event) => {
    const newTabs: ToolbarTabsTab[] = [...tabs];
    const newTab: ToolbarTabsTab = {
      id: uniqueId(),
      label: `${labels.undefined} ${newTabs.length + 1}`,
      icon: iconProp,
    };
    newTabs.push(newTab);
    handleChangeSelectedTab(event, newTab.id);
    handleChangeTabs?.(event, newTabs);
  };

  /* const handleClose = (
    event: React.MouseEvent<HTMLButtonElement>,
    tabId: string,
  ) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    if (tabId === selectedTab) {
      const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
      const newIndex = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
      handleChangeSelectedTab(event, newTabs[newIndex]?.id ?? "none");
    }

    if (hiddenTabs.length === 1) rootWidthLimitReached.current = false;

    handleChangeTabs(event, newTabs);
  }; */

  /* const handleEdit = (
    event: React.SyntheticEvent,
    value: string,
    tabId: string,
  ) =>
    handleChangeTabs(
      event,
      tabs.map((tab) => (tab.id === tabId ? { ...tab, label: value } : tab)),
    ); */

  return (
    <div
      ref={rootForkedRef}
      className={cx(classes.root, className)}
      {...others}
    >
      <div className={classes.tabsContainer}>
        {visibleTabs.length > 0 && (
          <HvCanvasPanelTabs
            classes={{ list: classes.tabsList }}
            value={selectedTab}
            onChange={handleChangeSelectedTab}
          >
            {visibleTabs.map((tab, index) => {
              const btnDisabled = selectedTab !== tab.id;

              return (
                <HvCanvasPanelTab
                  key={tab.id}
                  ref={index === 0 ? tabRef : undefined}
                  id={String(tab.id)}
                  className={classes.tab}
                  value={tab.id}
                  tabIndex={0}
                >
                  <div className={classes.tabContent}>
                    {tab.icon && (
                      <div className={classes.tabIcon}>{tab.icon}</div>
                    )}
                    {btnDisabled ? (
                      <HvOverflowTooltip data={tab.label} />
                    ) : (
                      /** TODO - Create the custom inline editor for the tabs */
                      <HvTypography contentEditable={allowTabEdit}>
                        {tab.label}
                      </HvTypography>
                    )}
                    {/** TODO - Implement delete like tags: through click and keyboard */}
                    <div className={classes.closeIconContainer}>
                      <CloseXS iconSize="XS" />
                    </div>
                    {selectedTab !== tab.id &&
                      visibleTabs[index + 1]?.id !== selectedTab && (
                        <div className={classes.tabDivider} />
                      )}
                  </div>
                </HvCanvasPanelTab>
              );
            })}
          </HvCanvasPanelTabs>
        )}
        {hiddenTabs.length > 0 && (
          <HvDropDownMenu
            className={classes.dropdownMenu}
            classes={{ menuListRoot: classes.dropdownMenuListRoot }}
            dataList={hiddenTabs}
            icon={<MoreOptionsHorizontal />}
            labels={{ dropdownMenu: labels.dropdownMenu }}
            onClick={(event, value) =>
              handleChangeSelectedTab(event, value.id ?? "none")
            }
          />
        )}
      </div>
      <div ref={actionsRef} className={classes.actionsContainer}>
        {children}
        <HvButton
          variant="primaryGhost"
          startIcon={<AddAlt />}
          onClick={handleCreateNew}
        >
          {labels.create}
        </HvButton>
      </div>
    </div>
  );
});
