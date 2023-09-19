import React, { useCallback, useMemo } from "react";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiBackdrop from "@mui/material/Backdrop";

import { Close } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { HvButton } from "@core/components/Button";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { setId } from "@core/utils/setId";
import { withTooltip } from "@core/hocs/withTooltip";
import { useTheme } from "@core/hooks/useTheme";
import { hexToRgbA } from "@core/utils/hexToRgbA";

import { staticClasses, useClasses } from "./Dialog.styles";

export { staticClasses as dialogClasses };

export type HvDialogClasses = ExtractNames<typeof useClasses>;

export interface HvDialogProps
  extends Omit<MuiDialogProps, "fullScreen" | "classes" | "open">,
    HvBaseProps {
  /** Current state of the Dialog. */
  open?: boolean;
  /** Function executed on close. */
  onClose?: (
    event: React.SyntheticEvent,
    reason?: "escapeKeyDown" | "backdropClick"
  ) => void;
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
  delete (others as any).fullScreen;

  const { rootId, colors } = useTheme();

  // Because the `disableBackdropClick` property was deprecated in MUI5
  // and we want to maintain that functionality to the user we're wrapping
  // the onClose call here to make that check.
  const wrappedClose = useCallback(
    (
      event: any,
      bypassValidation: boolean = false,
      reason?: "escapeKeyDown" | "backdropClick"
    ) => {
      if (bypassValidation || !disableBackdropClick) {
        onClose?.(event, reason);
      }
    },
    [onClose, disableBackdropClick]
  );

  const measuredRef = useCallback(() => {
    if (!firstFocusable) return;

    const element = document.getElementById(firstFocusable);
    element?.focus();
  }, [firstFocusable]);

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  const slots = useMemo<MuiDialogProps["slots"]>(
    () => ({
      backdrop: (backdropProps) => (
        <MuiBackdrop open={open} onClick={wrappedClose} {...backdropProps} />
      ),
    }),
    [open, wrappedClose]
  );

  return (
    <MuiDialog
      container={
        typeof window !== "undefined"
          ? // TODO: review
            // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
            document.getElementById(rootId || "") || document.body
          : undefined
      }
      className={cx(classes.root, className)}
      classes={{ container: css({ position: "relative" }) }}
      id={id}
      ref={measuredRef}
      open={open}
      fullScreen={fullscreen}
      onClose={(event, reason) => wrappedClose(event, undefined, reason)}
      slots={slots}
      slotProps={{
        backdrop: {
          classes: {
            root: cx(
              css({
                background: hexToRgbA(colors?.atmo4 || theme.colors.atmo4, 0.8),
              }),
              classes.background
            ),
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
      <HvButton
        id={setId(id, "close")}
        className={classes.closeButton}
        variant="secondaryGhost"
        onClick={(event) => wrappedClose(event, true, undefined)}
        aria-label={buttonTitle}
      >
        <CloseButtonTooltipWrapper />
      </HvButton>
      {children && typeof children === "object"
        ? React.Children.map(
            children,
            (c: React.ReactNode) =>
              c && React.cloneElement(c as React.ReactElement, { fullscreen })
          )
        : children}
    </MuiDialog>
  );
};
