import { clsx } from "clsx";

import { HvBaseProps } from "@core/types/generic";
import { setId } from "@core/utils/setId";

import {
  HvVerticalNavigationTree,
  verticalNavigationTreeClasses,
} from "../Navigation";
import { NavigationData } from "../VerticalNavigationContext";
import { NavigationPopupContainer } from "./NavigationPopupContainer";

export interface HvVerticalNavigationPopupProps
  extends HvBaseProps<HTMLDivElement> {
  id?: string;
  anchorEl?: HTMLElement | null;
  fixedMode?: boolean;
  data?: NavigationData[];
  selected?: string;
  onClose?: () => void;
  onChange?: any;
}

export const HvVerticalNavigationPopup = ({
  id,
  anchorEl,
  fixedMode,
  onClose,
  data,
  selected,
  onChange,
  ...others
}: HvVerticalNavigationPopupProps) => {
  const handleChange = (event, selectedItem) => {
    onChange(event, selectedItem.id, selectedItem);
  };

  const handleMouseLeave = () => {
    if (!fixedMode) {
      onClose?.();
    }
  };

  return (
    <NavigationPopupContainer anchorEl={anchorEl} onClose={onClose} {...others}>
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
    </NavigationPopupContainer>
  );
};
