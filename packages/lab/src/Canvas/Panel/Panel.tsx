import {
  ExtractNames,
  HvBaseProps,
  useControlled,
  useDefaultProps,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import { End, Start } from "@hitachivantara/uikit-react-icons";

import { HvCanvasTab, HvCanvasTabs, HvCanvasTabsProps } from "../Tabs";
import { staticClasses, useClasses } from "./Panel.styles";

export { staticClasses as canvasPanelClasses };

export type HvCanvasPanelClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  open: "Open",
  close: "Close",
};

export interface HvCanvasPanelProps extends HvBaseProps<HTMLDivElement> {
  /** Whether the panel is open or not. If this property is defined, the panel must be fully controlled. */
  open?: boolean;
  /** When uncontrolled, defines the initial state of the panel. */
  defaultOpened?: boolean;
  /** The tabs that should be visible on the canvas panel. */
  tabs?: HvCanvasTab[];
  /** The function that will be executed whenever the panel toggles. It will receive the state of the panel. */
  onToggle?: (
    event: React.MouseEvent | React.KeyboardEvent,
    open: boolean,
  ) => void;
  /** The function that will be executed when a tab changes. It will receive the id of the selected tab. */
  onTabChange?: (event: React.SyntheticEvent | null, tabId: string) => void;
  /** An object containing all the labels. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /* The content that will be rendered within the canvas panel. */
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
    labels: labelsProp,
    className,
    children,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvCanvasPanel", props);

  const { classes, cx } = useClasses(classesProp);
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const [open, setOpen] = useControlled(openProp, Boolean(defaultOpened));

  const handleTogglePanel = (event: React.MouseEvent | React.KeyboardEvent) => {
    setOpen((prev) => !prev);
    onToggle?.(event, !open);
  };

  const handleTabChange: HvCanvasTabsProps["onChange"] = (event, tabId) => {
    onTabChange?.(event, tabId);
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
};
