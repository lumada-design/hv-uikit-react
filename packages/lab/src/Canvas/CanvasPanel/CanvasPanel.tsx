import { useCallback, useEffect } from "react";
import {
  ExtractNames,
  HvBaseProps,
  useControlled,
  useDefaultProps,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { End, Start } from "@hitachivantara/uikit-react-icons";

import { HvCanvasTab, HvCanvasTabs } from "../CanvasTabs";
import { staticClasses, useClasses } from "./CanvasPanel.styles";

export { staticClasses as canvasPanelClasses };

export type HvCanvasPanelClasses = ExtractNames<typeof useClasses>;

export interface HvCanvasPanelProps extends HvBaseProps<HTMLDivElement> {
  /** Whether the panel is open or not. If this property is defined the panel must be fully controlled. */
  open?: boolean;
  /** When uncontrolled, defines the initial state of the panel. */
  defaultOpened?: boolean;
  /** The tabs that should be visible on the canvas panel */
  tabs?: HvCanvasTab[];
  /** The function that will be executed whenever the panel toggles. It will receive the state of the accordion. */
  onToggle?: (open: boolean) => void;
  /** The function that will be executed when a tab changes.It will receive the id of the selected tab. */
  onTabChange?: (tabId: string) => void;
  /* The content that will be rendered within canvas panel. */
  children?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasPanelClasses;
}

/**
 * A panel component to use in a canvas context.
 */
export const HvCanvasPanel = (props: HvCanvasPanelProps) => {
  const {
    open: openProp,
    defaultOpened = false,
    tabs,
    onToggle,
    onTabChange,
    className,
    children,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvCanvasPanel", props);

  const { classes, cx } = useClasses(classesProp);
  const { rootId, activeTheme } = useTheme();

  const [open, setOpen] = useControlled(openProp, Boolean(defaultOpened));

  const setPanelWidth = useCallback(() => {
    if (rootId) {
      document
        .getElementById(rootId)
        ?.style.setProperty(
          "--canvas-panel-width",
          !open
            ? "0px"
            : `${320 + (activeTheme ? parseInt(activeTheme.space.md, 10) : 24)}px`,
        );
    }
  }, [activeTheme, open, rootId]);

  useEffect(() => {
    setPanelWidth();
  }, [open, setPanelWidth]);

  const handleTogglePanel = () => {
    setOpen((prev) => !prev);
    onToggle?.(!open);
  };

  const handleTabChange = (tabId: string) => {
    onTabChange?.(tabId);
  };

  return (
    <>
      <div
        className={cx(classes.root, className, {
          [classes.open]: open,
          [classes.close]: !open,
        })}
        {...others}
      >
        {tabs && (
          <HvCanvasTabs
            className={classes.tabs}
            tabs={tabs}
            onChange={handleTabChange}
          />
        )}
        <div className={classes.content}>{children}</div>
      </div>
      <div
        className={cx(classes.handle, {
          [classes.open]: open,
          [classes.close]: !open,
        })}
        onClick={handleTogglePanel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleTogglePanel();
          }
        }}
        aria-label={open ? "Close" : "Open"}
      >
        <div className={classes.handleButton}>
          {open ? <Start color={["primary"]} /> : <End color={["primary"]} />}
        </div>
      </div>
    </>
  );
};
