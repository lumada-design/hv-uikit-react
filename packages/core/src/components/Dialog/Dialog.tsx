import React, { useCallback, useMemo } from "react";
import { ClassNames } from "@emotion/react";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { BackdropProps } from "@mui/material";

import { Close } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBaseProps } from "@core/types/generic";
import { setId } from "@core/utils";
import { withTooltip } from "@core/hocs";
import { useTheme } from "@core/hooks";
import dialogClasses, { HvDialogClasses } from "./dialogClasses";
import { StyledBackdrop, StyledClose, styles } from "./Dialog.styles";

export interface HvDialogProps
  extends Omit<MuiDialogProps, "fullScreen" | "classes" | "open">,
    HvBaseProps {
  /** Id to be applied to the root node. */
  id?: string;
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
}

const DialogBackdrop = (backdropProps: BackdropProps) => {
  const { activeTheme, selectedMode } = useTheme();
  return (
    <StyledBackdrop
      $backColor={
        activeTheme?.colors?.modes[selectedMode].atmo4 || theme.colors.atmo4
      }
      {...backdropProps}
    />
  );
};

export const HvDialog = ({
  classes,
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
}: HvDialogProps) => {
  delete (others as any).fullScreen;

  const { rootId } = useTheme();

  // Because the `disableBackdropClick` property was deprecated in MUI5
  // and we want to maintain that functionality to the user we're wrapping
  // the onClose call here to make that check.
  const wrappedClose = useCallback(
    (
      event,
      bypassValidation: boolean = false,
      reason?: "escapeKeyDown" | "backdropClick"
    ) => {
      if (bypassValidation || !disableBackdropClick) {
        onClose?.(event, reason);
      }
    },
    [onClose]
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
        <DialogBackdrop open={open} onClick={wrappedClose} {...backdropProps} />
      ),
    }),
    [open, wrappedClose]
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <MuiDialog
          container={document.getElementById(rootId || "") || document.body}
          className={cx(dialogClasses.root, className, classes?.root)}
          id={id}
          ref={measuredRef}
          open={open}
          fullScreen={fullscreen}
          onClose={(event, reason) => wrappedClose(event, undefined, reason)}
          slots={slots}
          classes={{ container: css({ position: "relative" }) }}
          BackdropProps={{
            classes: {
              root: cx(dialogClasses.background, classes?.background),
            },
          }}
          PaperProps={{
            classes: {
              root: cx(
                dialogClasses.paper,
                fullscreen && cx(dialogClasses.fullscreen, "fullscreen"),
                css(styles.paper),
                css({ position: "absolute" }),
                classes?.paper,
                fullscreen && classes?.fullscreen
              ),
            },
          }}
          aria-modal
          {...others}
        >
          <StyledClose
            id={setId(id, "close")}
            className={cx(dialogClasses.closeButton, classes?.closeButton)}
            variant="secondaryGhost"
            onClick={(event) => wrappedClose(event, true, undefined)}
            aria-label={buttonTitle}
          >
            <CloseButtonTooltipWrapper />
          </StyledClose>
          {children && typeof children === "object"
            ? React.Children.map(
                children,
                (c: React.ReactNode) =>
                  c &&
                  React.cloneElement(c as React.ReactElement, { fullscreen })
              )
            : children}
        </MuiDialog>
      )}
    </ClassNames>
  );
};
