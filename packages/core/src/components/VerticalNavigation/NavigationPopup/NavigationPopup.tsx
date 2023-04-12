import { Popper, ClickAwayListener } from "@mui/material";
import clsx from "clsx";

import {
  NavigationData,
  HvVerticalNavigationTree,
  HvVerticalNavigation,
  verticalNavigationTreeClasses,
} from "components";
import { setId } from "utils";

import { StyledPopupContainer } from "./NavigationPopup.styles";

export type HvVerticalNavigationPopupProps = {
  id?: string;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  data?: NavigationData[];
  selected?: string;
  onChange?: any;
};

export const HvVerticalNavigationPopup = ({
  id,
  anchorEl,
  onClose,
  data,
  selected,
  onChange,
}: HvVerticalNavigationPopupProps) => {
  const handleClickAway = () => {
    onClose?.();
  };

  const handleChange = (event, selectedItem) => {
    onChange(event, selectedItem.id, selectedItem);
  };

  return (
    <Popper open anchorEl={anchorEl} placement="right-start">
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
            />
          </HvVerticalNavigation>
        </StyledPopupContainer>
      </ClickAwayListener>
    </Popper>
  );
};
