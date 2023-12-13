import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { Close } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { IconButton } from "@core/utils/IconButton";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Drawer.styles";

export { staticClasses as drawerClasses };

export type HvDrawerClasses = ExtractNames<typeof useClasses>;

export interface HvDrawerProps extends Omit<MuiDrawerProps, "classes"> {
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
  /**
   * Show backdrop when drawer is open.
   * @deprecated Use `hideBackdrop` instead.
   */
  showBackdrop?: boolean;
  /**
   * Prevent closing the dialog when clicking on the backdrop.
   */
  disableBackdropClick?: boolean;
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
    showBackdrop = true,
    hideBackdrop,
    disableBackdropClick = false,
    ...others
  } = useDefaultProps("HvDrawer", props);

  const { classes, cx } = useClasses(classesProp);

  const handleOnClose: MuiDrawerProps["onClose"] = (
    event: React.SyntheticEvent,
    reason
  ) => {
    if (reason === "backdropClick" && disableBackdropClick) return;

    onClose?.(event, reason);
  };

  const shouldHideBackdrop = hideBackdrop ?? !showBackdrop;

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
      hideBackdrop={shouldHideBackdrop}
      {...(!shouldHideBackdrop && {
        slotProps: {
          backdrop: {
            classes: {
              root: classes.background,
            },
            onClick: (event) => {
              if (disableBackdropClick) return;
              onClose?.(event, "backdropClick");
            },
          },
        },
      })}
      onClose={handleOnClose}
      {...others}
    >
      <IconButton
        id={setId(id, "close")}
        className={classes.closeButton}
        variant="secondaryGhost"
        onClick={onClose}
        title={buttonTitle}
      >
        <Close role="none" />
      </IconButton>
      {children}
    </MuiDrawer>
  );
};
