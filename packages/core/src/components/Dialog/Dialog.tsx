import React, { useCallback, useRef } from "react";
import { clsx } from "clsx";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { Close } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import isNil from "lodash/isNil";
import { HvBaseProps } from "@core/types/generic";
import { StyledBackdrop, StyledClose, styles } from "./Dialog.styles";
import {
  isKeypress,
  keyboardCodes,
  setId,
  getFocusableList,
} from "@core/utils";
import { withTooltip } from "@core/hocs";
import dialogClasses, { HvDialogClasses } from "./dialogClasses";
import { useTheme } from "@core/hooks";
import { ClassNames } from "@emotion/react";

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
  /** Element id that should be focus when the Dialog opens. */
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

  const { activeTheme, selectedMode, rootId } = useTheme();

  const focusableQueue = useRef<{
    first?: HTMLElement;
    last?: HTMLElement;
  }>({ first: undefined, last: undefined });

  // Because the `disableBackdropClick` property was deprecated in MUI5
  // and we want to maintain that functionality to the user we're wrapping
  // the onClose call here to make that check.
  const wrappedClose = (
    event,
    bypassValidation: boolean = false,
    reason?: "escapeKeyDown" | "backdropClick"
  ) => {
    if (bypassValidation) {
      onClose?.(event, reason);
    } else if (!disableBackdropClick) {
      onClose?.(event, reason);
    }
  };

  const measuredRef = useCallback(
    (node) => {
      if (node) {
        const focusableList = getFocusableList(node);
        focusableQueue.current = {
          first: focusableList[1],
          last: focusableList[focusableList.length - 2],
        };
        if (isNil(firstFocusable)) focusableList[1].focus();
        else {
          const element =
            firstFocusable && document.getElementById(firstFocusable);
          if (element) element.focus();
          else {
            console.warn(`firstFocusable element ${firstFocusable} not found.`);

            focusableList[1].focus();
          }
        }
      }
    },
    [firstFocusable]
  );

  const keyDownHandler = (event) => {
    if (
      isKeypress(event, keyboardCodes.Tab) &&
      !isNil(event.target) &&
      !isNil(focusableQueue)
    ) {
      if (event.shiftKey && event.target === focusableQueue.current.first) {
        focusableQueue.current.last?.focus();
        event.preventDefault();
      }
      if (!event.shiftKey && event.target === focusableQueue.current.last) {
        focusableQueue.current.first?.focus();
        event.preventDefault();
      }
    }
    // Needed as this handler overrides the one in the material ui Modal.
    else if (isKeypress(event, keyboardCodes.Esc)) {
      if (
        "onEscapeKeyDown" in others &&
        typeof others.onEscapeKeyDown === "function"
      ) {
        others.onEscapeKeyDown(event);
      }

      if (!others.disableEscapeKeyDown) {
        // Swallow the event, in case someone is listening for the escape key on the body.
        event.stopPropagation();

        wrappedClose(event, true, "escapeKeyDown");
      }
    }
  };

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  return (
    <ClassNames>
      {({ css }) => (
        <MuiDialog
          container={document.getElementById(rootId || "") || document.body}
          className={clsx(dialogClasses.root, classes?.root, className)}
          id={id}
          ref={measuredRef}
          open={open}
          fullScreen={fullscreen}
          onClose={(event, reason) => wrappedClose(event, undefined, reason)}
          onKeyDown={keyDownHandler}
          fullWidth
          maxWidth={false}
          slots={{
            backdrop: (backdropProps) => (
              <StyledBackdrop
                open={open}
                onClick={(event) => wrappedClose(event)}
                $backColor={
                  activeTheme?.colors?.modes[selectedMode].atmo4 ||
                  theme.colors.atmo4
                }
                {...backdropProps}
              />
            ),
          }}
          classes={{ container: css({ position: "relative" }) }}
          BackdropProps={{
            classes: {
              root: clsx(classes?.background, dialogClasses.background),
            },
          }}
          PaperProps={{
            classes: {
              root: clsx(
                css(styles.paper),
                classes?.paper,
                dialogClasses.paper,
                css({ position: "absolute" }),
                fullscreen &&
                  clsx(
                    dialogClasses.fullscreen,
                    classes?.fullscreen,
                    "fullscreen"
                  )
              ),
            },
          }}
          aria-modal
          {...others}
        >
          <StyledClose
            id={setId(id, "close")}
            className={clsx(dialogClasses.closeButton, classes?.closeButton)}
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
