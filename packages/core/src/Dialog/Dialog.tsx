import { useCallback, useMemo } from "react";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { Close } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { getElementById } from "../utils/document";
import { ExtractNames } from "../utils/classes";
import { setId } from "../utils/setId";
import { useTheme } from "../hooks/useTheme";
import { staticClasses, useClasses } from "./Dialog.styles";
import { DialogContext } from "./context";
import { HvIconButton } from "../IconButton";

export { staticClasses as dialogClasses };

export type HvDialogClasses = ExtractNames<typeof useClasses>;

export interface HvDialogProps
  extends Omit<MuiDialogProps, "fullScreen" | "classes" | "open"> {
  /** Current state of the Dialog. */
  open?: boolean;
  /** Callback fired when the component requests to be closed. */
  onClose?: (event: any, reason?: "escapeKeyDown" | "backdropClick") => void;
  /** @inheritdoc */
  maxWidth?: MuiDialogProps["maxWidth"];
  /** @inheritdoc */
  fullWidth?: MuiDialogProps["fullWidth"];
  /**
   * Element id that should be focus when the Dialog opens.
   * Auto-focusing elements can cause usability issues, so this should be avoided.
   * @deprecated Use `autoFocus` on the element instead, if auto-focusing is required.
   */
  firstFocusable?: string;
  /** Title for the button close. */
  buttonTitle?: string;
  /** Set the dialog to fullscreen mode. */
  fullscreen?: boolean;
  /** Prevent closing the dialog when clicking on the backdrop. */
  disableBackdropClick?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDialogClasses;
  /** Variant of the dialog. Adds a status bar to the top of the dialog. If not provided, no status bar is added. */
  variant?: "success" | "error" | "warning";
  /** @ignore */
  ref?: MuiDialogProps["ref"];
  /** @ignore */
  component?: MuiDialogProps["component"];
}

export const HvDialog = (props: HvDialogProps) => {
  const {
    variant,
    classes: classesProp,
    className,
    id,
    children,
    open = false,
    onClose,
    firstFocusable,
    buttonTitle = "Close",
    fullscreen = false,
    disableBackdropClick = false,
    ...others
  } = useDefaultProps("HvDialog", props);

  const { classes, css, cx } = useClasses(classesProp);
  const { rootId } = useTheme();

  const measuredRef = useCallback(() => {
    if (!firstFocusable) return;

    const element = document.getElementById(firstFocusable);
    element?.focus();
  }, [firstFocusable]);

  const contextValue = useMemo(() => ({ fullscreen }), [fullscreen]);

  return (
    <MuiDialog
      container={getElementById(rootId)}
      className={cx(classes.root, className)}
      classes={{ container: css({ position: "relative" }) }}
      id={id}
      ref={measuredRef}
      open={open}
      fullScreen={fullscreen}
      onClose={(event, reason) => {
        // `disableBackdropClick` property was removed in MUI5
        // and we want to maintain that functionality
        if (disableBackdropClick) return;

        onClose?.(event, reason);
      }}
      slotProps={{
        backdrop: {
          classes: {
            root: classes.background,
          },
        },
      }}
      PaperProps={{
        classes: {
          root: cx(
            css({ position: "absolute" }),
            classes.paper,
            variant && cx(classes.statusBar, classes[variant]),
            {
              [classes.fullscreen]: fullscreen,
            }
          ),
        },
      }}
      aria-modal
      {...others}
    >
      <HvIconButton
        title={buttonTitle}
        id={setId(id, "close")}
        className={classes.closeButton}
        onClick={(event) => onClose?.(event, undefined)}
      >
        <Close role="none" />
      </HvIconButton>
      <DialogContext.Provider value={contextValue}>
        {children}
      </DialogContext.Provider>
    </MuiDialog>
  );
};
