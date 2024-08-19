import { forwardRef, useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import {
  clamp,
  ExtractNames,
  HvBaseProps,
  HvButton,
  HvButtonProps,
  HvDropDownMenu,
  HvOverflowTooltip,
  isKey,
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
import { ToolbarTabEditor } from "./ToolbarTabEditor";
import {
  DROPDOWN_MENU_WIDTH,
  MAX_TAB_WIDTH,
  MIN_TAB_WIDTH,
  staticClasses,
  useClasses,
} from "./ToolbarTabs.styles";

export { staticClasses as canvasToolbarTabsClasses };

export type HvCanvasToolbarTabsClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  create: "Create new",
  undefined: "Undefined",
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

  const handleEdit = (
    event: React.FormEvent<Element>,
    value: string,
    tabId: string,
  ) =>
    handleChangeTabs(
      event,
      tabs.map((tab) => (tab.id === tabId ? { ...tab, label: value } : tab)),
    );

  const handleDeleteTab = (event: any, tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    if (tabId === selectedTab) {
      const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
      const newIndex = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
      handleChangeSelectedTab(event, newTabs[newIndex]?.id ?? "none");
    }

    handleChangeTabs(event, newTabs);
  };

  const handleKeyDownTab = (event: React.KeyboardEvent, tabId: string) => {
    if (isKey(event, "Delete") || isKey(event, "Backspace"))
      handleDeleteTab(event, tabId);
  };

  const { tabWidth, hiddenTabs, visibleTabs } = useMemo(() => {
    let availableWidth = rootWidth - actionsWidth;
    let calculatedTabWidth = availableWidth / tabs.length;
    let clamped = clamp(calculatedTabWidth, MAX_TAB_WIDTH, MIN_TAB_WIDTH);

    // Overflowing
    if (calculatedTabWidth < MIN_TAB_WIDTH) {
      availableWidth -= DROPDOWN_MENU_WIDTH;
      const visibleCount = Math.floor(availableWidth / MIN_TAB_WIDTH);
      calculatedTabWidth = availableWidth / visibleCount;
      clamped = clamp(calculatedTabWidth, MAX_TAB_WIDTH, MIN_TAB_WIDTH);

      const temporaryHiddenTabs = tabs.slice(visibleCount);
      const selectedTabHiddenIndex = temporaryHiddenTabs.findIndex(
        (tab) => tab.id === selectedTab,
      );
      const excludedTabIndex = visibleCount - 1;
      const shouldShuffle = selectedTabHiddenIndex !== -1 && visibleCount > 0;

      if (shouldShuffle) {
        return {
          tabWidth: clamped,
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
        tabWidth: clamped,
        visibleTabs: tabs.slice(0, visibleCount),
        hiddenTabs: temporaryHiddenTabs,
      };
    }

    return {
      tabWidth: clamped,
      visibleTabs: tabs,
      hiddenTabs: [],
    };
  }, [actionsWidth, rootWidth, selectedTab, tabs]);

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
              const btnSelected = selectedTab === tab.id;
              return (
                <HvCanvasPanelTab
                  style={{
                    width: tabWidth,
                  }}
                  key={tab.id}
                  id={String(tab.id)}
                  className={classes.tab}
                  value={tab.id}
                  tabIndex={0}
                  onKeyDown={(event) => handleKeyDownTab(event, tab.id)}
                >
                  <div className={classes.tabContent}>
                    {tab.icon && (
                      <div className={classes.tabIconContainer}>{tab.icon}</div>
                    )}
                    {!btnSelected || !allowTabEdit ? (
                      <HvOverflowTooltip
                        classes={{
                          tooltipAnchor: classes.tabLabel,
                        }}
                        data={tab.label}
                      />
                    ) : (
                      <ToolbarTabEditor
                        classes={{
                          label: cx(classes.tabLabel, classes.tabLabelEditor),
                        }}
                        value={tab.label}
                        onChange={(event, value) =>
                          handleEdit(event, value, tab.id)
                        }
                        onBlur={(event, value) =>
                          handleEdit(event, value, tab.id)
                        }
                        // We don't want the arrow keys to trigger the tab navigation
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    )}
                    <div className={classes.closeIconContainer}>
                      <CloseXS
                        aria-hidden
                        data-testid="delete-icon" // For testing purposes
                        iconSize="XS"
                        onClick={(event) => {
                          handleDeleteTab(event, tab.id);

                          // We don't want the click to select the tab also
                          event.stopPropagation();
                        }}
                      />
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
            classes={{
              container: classes.dropdownMenuContainer,
              menuListRoot: classes.dropdownMenuListRoot,
            }}
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
