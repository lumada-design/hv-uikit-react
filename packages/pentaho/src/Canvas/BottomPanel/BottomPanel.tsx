import { forwardRef, useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import {
  ExtractNames,
  HvActionGeneric,
  HvActionsGeneric,
  HvActionsGenericProps,
  HvBaseProps,
  HvPanel,
  useControlled,
  useDefaultProps,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";

import { HvCanvasTab } from "../Tab";
import { HvCanvasTabs, HvCanvasTabsProps } from "../Tabs";
import { staticClasses, useClasses } from "./BottomPanel.styles";

export { staticClasses as canvasBottomPanelClasses };

export type HvCanvasBottomPanelClasses = ExtractNames<typeof useClasses>;

export interface HvCanvasBottomPanelProps extends HvBaseProps {
  /** Open state of the bottom panel. */
  open?: boolean;
  /** Minimize state of the bottom panel tabs'. */
  minimize?: boolean;
  /** List of tabs visible on the panel. */
  tabs: {
    id: string | number;
    title: React.ReactNode;
  }[];
  /** Id of the selected tab if it needs to be controlled. */
  tab?: string | number;
  /** Callback triggered when a tab changes/is clicked. */
  onTabChange?: (
    event: React.SyntheticEvent | null,
    tabId: string | number | null,
  ) => void;
  /** Actions to be rendered in the left side of a tab. If more than one action is provided, a dropdown menu will be used. */
  leftActions?: HvActionsGenericProps["actions"];
  /** Actions to be rendered in the right side of a tab.If more than two actions are provided, a dropdown menu will be used to add the remaining actions. */
  rightActions?: HvActionsGenericProps["actions"];
  /** Callback triggered when a right or left action is clicked. */
  onAction?: (
    event: React.SyntheticEvent,
    action: HvActionGeneric,
    tabId: string | number,
  ) => void;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasBottomPanelClasses;
}

/**
 * A bottom panel component to use in a canvas context.
 */
export const HvCanvasBottomPanel = forwardRef<
  HTMLDivElement,
  HvCanvasBottomPanelProps
>((props, ref) => {
  const {
    id: idProp,
    className,
    children,
    open,
    tabs,
    minimize,
    leftActions,
    rightActions,
    tab: tabProp,
    classes: classesProp,
    onTabChange,
    onAction,
    ...others
  } = useDefaultProps("HvCanvasBottomPanel", props);

  const { classes, cx } = useClasses(classesProp);

  const id = useUniqueId(idProp);

  // Tab resize detector: to position tab actions and set the panel top right border radius
  const { width: tabWidth = 0, ref: tabRef } = useResizeDetector({
    handleHeight: false,
  });
  // Tab panel resize detector: to set the panel top right border radius
  const { width: panelWidth = 0, ref: panelRef } = useResizeDetector({
    handleHeight: false,
  });

  // Left actions resize detector: to position tab title according with actions
  const { width: leftActionWidth = 32, ref: leftActionRef } = useResizeDetector(
    {
      handleHeight: false,
      refreshMode: "debounce",
      refreshOptions: {
        trailing: true,
      },
    },
  );
  // Right actions resize detector: to position tab title according with actions
  const { width: rightActionWidth = 32, ref: rightActionRef } =
    useResizeDetector({
      handleHeight: false,
      refreshMode: "debounce",
      refreshOptions: {
        trailing: true,
      },
    });

  const overflowing = useMemo(() => {
    const scrollWidth = tabRef.current?.scrollWidth ?? 0;
    return scrollWidth - tabWidth >= 1;
  }, [tabRef, tabWidth]);

  const [selectedTab, setSelectedTab] = useControlled<string | number | null>(
    tabProp,
    tabs[0].id,
  );

  const handleTabChange: HvCanvasTabsProps["onChange"] = (event, tabId) => {
    setSelectedTab(tabId);
    onTabChange?.(event, tabId);
  };

  return (
    <div
      id={id}
      ref={ref}
      className={cx(
        classes.root,
        {
          [classes.closed]: !open,
          [classes.minimized]: minimize,
          [classes.multipleTabs]: tabs.length > 1,
          [classes.overflowing]: overflowing,
        },
        className,
      )}
      {...others}
    >
      <div className={classes.tabsRoot}>
        <HvCanvasTabs
          style={{
            // @ts-ignore
            "--left-actions-width": `${leftActionWidth}px`,
            "--right-actions-width": `${rightActionWidth}px`,
          }}
          onChange={handleTabChange}
          value={selectedTab}
        >
          {tabs.map((tab, index) => (
            <HvCanvasTab
              ref={index === 0 ? tabRef : undefined}
              key={tab.id}
              id={`${id}-${tab.id}`}
              value={tab.id}
              className={classes.tab}
            >
              <div className={classes.tabTitle}>{tab.title}</div>
            </HvCanvasTab>
          ))}
        </HvCanvasTabs>
        {/* For accessibility purposes, these buttons cannot be children of a tablist so they are rendered as HvCanvasTabs sibling. */}
        {(leftActions || rightActions) && !overflowing
          ? tabs.map((tab, index) => {
              const btnsDisabled = selectedTab !== tab.id && !minimize;
              return (
                <div
                  key={tab.id}
                  style={{
                    // @ts-ignore
                    "--tab-width": `${tabWidth}px`,
                    "--right": `calc((${index} + 1) * var(--tab-width))`,
                    "--left": `calc(${index} * var(--tab-width))`,
                  }}
                >
                  {leftActions && (
                    <div ref={leftActionRef} className={classes.leftActions}>
                      <HvActionsGeneric
                        maxVisibleActions={1}
                        actions={leftActions}
                        disabled={btnsDisabled}
                        onAction={(event, action) =>
                          onAction?.(event, action, tab.id)
                        }
                        variant="secondaryGhost"
                        iconOnly
                      />
                    </div>
                  )}
                  {rightActions && (
                    <div ref={rightActionRef} className={classes.rightActions}>
                      <HvActionsGeneric
                        maxVisibleActions={2}
                        actions={rightActions}
                        disabled={btnsDisabled}
                        onAction={(event, action) =>
                          onAction?.(event, action, tab.id)
                        }
                        variant="secondaryGhost"
                        iconOnly
                      />
                    </div>
                  )}
                </div>
              );
            })
          : null}
      </div>
      <HvPanel
        ref={panelRef}
        role="tabpanel"
        aria-labelledby={`${id}-${selectedTab}`}
        className={classes.content}
        style={{
          // @ts-ignore
          "--right-border-radius":
            tabWidth * tabs.length >= panelWidth ? "0px" : "16px",
        }}
      >
        {children}
      </HvPanel>
    </div>
  );
});
