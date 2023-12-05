import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  Backdrop as MuiBackdrop,
} from "@mui/material";

import { Close } from "@hitachivantara/uikit-react-icons";

import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";
import { IconButton } from "@core/utils/IconButton";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";
import { useTheme } from "@core/hooks/useTheme";
import { hexToRgbA } from "@core/utils/hexToRgbA";

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
  /**
   * Show backdrop when drawer ix open.
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
    disableBackdropClick = false,
    ...others
  } = useDefaultProps("HvDrawer", props);

  const { classes, cx, css } = useClasses(classesProp);
  const { colors } = useTheme();

  return (
    <>
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
      {showBackdrop && (
        <MuiBackdrop
          open={!!open}
          onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            if (disableBackdropClick) return;
            onClose?.(event, "backdropClick");
          }}
          className={cx(
            css({
              background: hexToRgbA(colors?.atmo4 || theme.colors.atmo4),
            }),
            classes.background
          )}
        />
      )}
    </>
  );
};
