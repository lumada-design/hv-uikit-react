import React, { useCallback, useContext, useState } from "react";
import clsx from "clsx";
import { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { Close } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { isNil } from "lodash";
import { HvBaseProps, HvExtraProps } from "../../types";
import {
  StyledBackdrop,
  StyledClose,
  StyledDialog,
  StyledPaper,
} from "./Dialog.styles";
import { getFocusableList } from "utils/focusableElementFinder";
import { isKeypress, keyboardCodes, setId } from "utils";
import { HvThemeContext } from "providers";
import { withTooltip } from "hocs";
import dialogClasses, { HvDialogClasses } from "./dialogClasses";

export type HvDialogProps = Omit<MuiDialogProps, "fullScreen"> &
  HvBaseProps & {
    /** Id to be applied to the root node. */
    id?: string;
    /** Current state of the Dialog. */
    open?: boolean;
    /** Function executed on close. */
    onClose?: any;
    /** Element id that should be focus when the Dialog opens. */
    firstFocusable?: string;
    /** Title for the button close. */
    buttonTitle?: string;
    /** Set the dialog to fullscreen mode. */
    fullscreen?: boolean;
    /** Prevent closing the dialog when clicking on the backdrop. */
    disableBackdropClick?: boolean;
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: HvDialogClasses;
  } & HvExtraProps;

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
  delete others.fullScreen;

  const { activeTheme, selectedMode, rootId } = useContext(HvThemeContext);

  const [focusableQueue, setFocusableQueue] = useState<{
    first: any;
    last: any;
  }>({ first: undefined, last: undefined });

  // Because the `disableBackdropClick` property was deprecated in MUI5
  // and we want to maintain that funcionality to the user we're wrapping
  // the onClose call here to make that check.
  const wrappedClose = (event, reason = "", bypassValidation = false) => {
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
        setFocusableQueue({
          first: focusableList[1],
          last: focusableList[focusableList.length - 2],
        });
        if (isNil(firstFocusable)) focusableList[1].focus();
        else {
          const element =
            firstFocusable && document.getElementById(firstFocusable);
          if (element) element.focus();
          else {
            // eslint-disable-next-line no-console
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
      if (event.shiftKey && event.target === focusableQueue.first) {
        focusableQueue.last.focus();
        event.preventDefault();
      }
      if (!event.shiftKey && event.target === focusableQueue.last) {
        focusableQueue.first.focus();
        event.preventDefault();
      }
    }
    // Needed as this handler overrides the one in the material ui Modal.
    else if (isKeypress(event, keyboardCodes.Esc)) {
      if ("onEscapeKeyDown" in others) {
        others.onEscapeKeyDown(event);
      }

      if (!others.disableEscapeKeyDown) {
        // Swallow the event, in case someone is listening for the escape key on the body.
        event.stopPropagation();

        wrappedClose(event, "escapeKeyDown", true);
      }
    }
  };

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top", null, null, null)
    : closeButtonDisplay;

  return (
    <StyledDialog
      container={document.getElementById(rootId || "") || document.body}
      className={clsx(dialogClasses.root, classes?.root, className)}
      id={id}
      ref={measuredRef}
      open={open}
      fullScreen={fullscreen}
      onClose={(event, reason) => wrappedClose(event, reason)}
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
      PaperComponent={(paperProps) => (
        <StyledPaper $fullscreen={fullscreen} {...paperProps} />
      )}
      PaperProps={{
        classes: {
          root: fullscreen
            ? clsx(dialogClasses.fullscreen, classes?.fullscreen)
            : "",
        },
      }}
      {...others}
      aria-modal
    >
      <StyledClose
        id={setId(id, "close")}
        className={clsx(dialogClasses.closeButton, classes?.closeButton)}
        variant="secondaryGhost"
        onClick={(event) => wrappedClose(event, undefined, true)}
        aria-label={buttonTitle}
      >
        <CloseButtonTooltipWrapper />
      </StyledClose>
      {children && typeof children === "object"
        ? React.Children.map(
            children,
            (c: React.ReactNode) =>
              c && React.cloneElement(c as React.ReactElement, { fullscreen })
          )
        : children}
    </StyledDialog>
  );
};
