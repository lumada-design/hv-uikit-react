import { ClickAwayListener } from "@mui/material";
import { clsx } from "clsx";

import {
  NavigationData,
  HvVerticalNavigationTree,
  HvVerticalNavigation,
  verticalNavigationTreeClasses,
} from "@core/components";
import { setId } from "@core/utils";

import { StyledPopper, StyledPopupContainer } from "./NavigationPopup.styles";

export interface HvVerticalNavigationPopupProps {
  id?: string;
  anchorEl?: HTMLElement | null;
  fixedMode?: boolean;
  data?: NavigationData[];
  selected?: string;
  onClose?: () => void;
  onChange?: any;
  popupStyles?: any;
}

export const HvVerticalNavigationPopup = ({
  id,
  anchorEl,
  fixedMode,
  onClose,
  data,
  selected,
  onChange,
  popupStyles,
}: HvVerticalNavigationPopupProps) => {
  const handleClickAway = () => {
    onClose?.();
  };

  const handleChange = (event, selectedItem) => {
    onChange(event, selectedItem.id, selectedItem);
  };

  const handleMouseLeave = () => {
    if (!fixedMode) {
      onClose?.();
    }
  };

  return (
    <StyledPopper
      open
      anchorEl={anchorEl}
      placement="right-start"
      style={popupStyles}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <StyledPopupContainer>
          <HvVerticalNavigation open>
            <HvVerticalNavigationTree
              className={clsx(verticalNavigationTreeClasses.popup)}
              id={setId(id, "tree")}
              collapsible
              defaultExpanded
              selected={selected}
              onChange={handleChange}
              data={data}
              onMouseLeave={handleMouseLeave}
            />
          </HvVerticalNavigation>
        </StyledPopupContainer>
      </ClickAwayListener>
    </StyledPopper>
  );
};
