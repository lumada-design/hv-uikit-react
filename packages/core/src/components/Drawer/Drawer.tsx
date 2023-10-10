import { useDefaultProps } from "@core/hooks/useDefaultProps";

import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";

import { Close } from "@hitachivantara/uikit-react-icons";

import { HvBaseProps } from "@core/types/generic";
import { withTooltip } from "@core/hocs/withTooltip";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";
import { HvButton } from "@core/components/Button";

import { staticClasses, useClasses } from "./Drawer.styles";

export { staticClasses as drawerClasses };

export type HvDrawerClasses = ExtractNames<typeof useClasses>;

export interface HvDrawerProps
  extends MuiDrawerProps,
    Omit<MuiDrawerProps, "classes">,
    HvBaseProps<HTMLDivElement> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvDrawerClasses;
  /**
   * Components of the Drawer.
   */
  children?: React.ReactNode;
  /**
   * Current state of the Drawer.
   */
  open?: boolean;
  /**
   * Function executed on close.
   * Extended from Modal from material-ui
   *
   */
  onClose?: (
    event: React.SyntheticEvent,
    reason?: "escapeKeyDown" | "backdropClick"
  ) => void;
  /**
   * The side the drawer opens from.
   */
  anchor?: "left" | "top" | "right" | "bottom";
  /**
   * Title for the button close.
   */
  buttonTitle?: string;
  /** @ignore */
  ref?: MuiDrawerProps["ref"];
  /** @ignore */
  component?: MuiDrawerProps["component"];
}

/**
 * The Drawer component provides a foundation to create a sliding pane.
 * It only provides the pane with a close button, the rest of the
 * content can be customized.
 */
export const HvDrawer = (props: HvDrawerProps) => {
  const {
    className,
    classes: classesProp,
    id,
    children,
    open,
    onClose,
    anchor = "right",
    buttonTitle = "Close",
    ...others
  } = useDefaultProps("HvDrawer", props);

  const { classes, cx } = useClasses(classesProp);

  const closeButtonDisplay = () => <Close role="none" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  return (
    <MuiDrawer
      className={cx(classes.root, className)}
      id={id}
      anchor={anchor}
      open={open}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
      onClose={onClose}
      {...others}
    >
      <HvButton
        id={setId(id, "close")}
        className={classes.closeButton}
        variant="secondaryGhost"
        onClick={onClose}
        aria-label={buttonTitle}
      >
        <CloseButtonTooltipWrapper />
      </HvButton>
      {children}
    </MuiDrawer>
  );
};
