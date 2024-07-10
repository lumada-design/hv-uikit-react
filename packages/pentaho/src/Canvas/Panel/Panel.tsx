import { forwardRef } from "react";
import {
  ExtractNames,
  HvBaseProps,
  useControlled,
  useDefaultProps,
  useLabels,
  useUniqueId,
} from "@hitachivantara/uikit-react-core";
import { End, Start } from "@hitachivantara/uikit-react-icons";

import { HvCanvasTab } from "../Tab";
import { HvCanvasTabs, HvCanvasTabsProps } from "../Tabs";
import { staticClasses, useClasses } from "./Panel.styles";

export { staticClasses as canvasPanelClasses };

export type HvCanvasPanelClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  open: "Open",
  close: "Close",
};

export interface HvCanvasPanelProps extends HvBaseProps<HTMLDivElement> {
  /** When controlled, defines id the panel is open or not. */
  open?: boolean;
  /** When uncontrolled, defines the initial state of the panel. */
  defaultOpen?: boolean;
  /** List of tabs visible on the panel. */
  tabs?: {
    id: string | number;
    content: React.ReactNode;
  }[];
  /** Id of the selected tab if it needs to be controlled. */
  tab?: string | number;
  /** Callback triggered whenever the panel toggles. */
  onToggle?: (
    event: React.MouseEvent | React.KeyboardEvent,
    open: boolean,
  ) => void;
  /** Callback triggered when a tab changes/is clicked. */
  onTabChange?: (
    event: React.SyntheticEvent | null,
    tabId: string | number | null,
  ) => void;
  /** An object containing all the labels. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /** The content that will be rendered within the canvas panel. */
  children?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasPanelClasses;
}

/**
 * A panel component to use in a canvas context.
 */
export const HvCanvasPanel = forwardRef<HTMLDivElement, HvCanvasPanelProps>(
  (props, ref) => {
    const {
      id: idProp,
      tab: tabProp,
      open: openProp,
      defaultOpen = false,
      tabs,
      onToggle,
      onTabChange,
      labels: labelsProp,
      className,
      children,
      classes: classesProp,
      ...others
    } = useDefaultProps("HvCanvasPanel", props);

    const id = useUniqueId(idProp);

    const { classes, cx } = useClasses(classesProp);

    const labels = useLabels(DEFAULT_LABELS, labelsProp);

    const [open, setOpen] = useControlled(openProp, Boolean(defaultOpen));
    const [selectedTab, setSelectedTab] = useControlled<string | number | null>(
      tabProp,
      tabs?.[0]?.id ?? "none",
    );

    const handleTogglePanel = (
      event: React.MouseEvent | React.KeyboardEvent,
    ) => {
      setOpen((prev) => !prev);
      onToggle?.(event, !open);
    };

    const handleTabChange: HvCanvasTabsProps["onChange"] = (event, tabId) => {
      setSelectedTab(tabId);
      onTabChange?.(event, tabId);
    };

    return (
      <>
        <div
          ref={ref}
          id={id}
          className={cx(classes.root, className, {
            [classes.open]: open,
            [classes.close]: !open,
          })}
          {...others}
        >
          {tabs && (
            <HvCanvasTabs
              className={classes.tabs}
              value={selectedTab}
              onChange={handleTabChange}
            >
              {tabs.map((tab) => (
                <HvCanvasTab
                  key={tab.id}
                  id={`${id}-${tab.id}`}
                  value={tab.id}
                  tabIndex={0}
                >
                  {tab.content}
                </HvCanvasTab>
              ))}
            </HvCanvasTabs>
          )}
          <div
            role={tabs ? "tabpanel" : undefined}
            aria-labelledby={tabs ? `${id}-${selectedTab}` : undefined}
            className={classes.content}
          >
            {children}
          </div>
        </div>
        <div
          className={cx(classes.handle, {
            [classes.handleOpen]: open,
            [classes.handleClose]: !open,
          })}
          onClick={handleTogglePanel}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleTogglePanel(e);
            }
          }}
          aria-label={open ? labels.close : labels.open}
        >
          <div className={classes.handleButton}>
            {open ? <Start color={["primary"]} /> : <End color={["primary"]} />}
          </div>
        </div>
      </>
    );
  },
);
