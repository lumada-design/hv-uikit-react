import { forwardRef } from "react";
import {
  ClickAwayListener,
  ClickAwayListenerProps,
} from "@mui/base/ClickAwayListener";
import { Portal } from "@mui/base/Portal";

import { useTheme } from "../hooks/useTheme";
import { getContainerElement } from "../utils/document";

export interface HvDropdownContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disablePortal?: boolean;
  onClickAway: ClickAwayListenerProps["onClickAway"];
  onContainerKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

/**
 * HvBaseDropdown internal popper container component
 *
 * TODO: migrate MuiPopper/MuiPopup to simplify code
 */
export const HvDropdownContainer = forwardRef<
  HTMLDivElement,
  HvDropdownContainerProps
>((props, ref) => {
  const {
    children,
    disablePortal,
    onClickAway,
    onContainerKeyDown,
    ...others
  } = props;
  const { rootId } = useTheme();

  return (
    <Portal
      disablePortal={disablePortal}
      container={getContainerElement(rootId)}
    >
      <div ref={ref} {...others}>
        <ClickAwayListener onClickAway={onClickAway}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onKeyDown={onContainerKeyDown}>{children}</div>
        </ClickAwayListener>
      </div>
    </Portal>
  );
});
