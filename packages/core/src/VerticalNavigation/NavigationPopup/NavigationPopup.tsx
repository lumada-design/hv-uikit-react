import { HvBaseProps } from "../../types/generic";
import { setId } from "../../utils/setId";

import { HvVerticalNavigationTree } from "../Navigation";
import { NavigationData } from "../VerticalNavigationContext";
import {
  HvVerticalNavigationPopupClasses,
  NavigationPopupContainer,
} from "./NavigationPopupContainer";
import { useClasses } from "./NavigationPopup.styles";

export interface HvVerticalNavigationPopupProps
  extends HvBaseProps<HTMLDivElement> {
  id?: string;
  anchorEl?: HTMLElement | null;
  fixedMode?: boolean;
  data?: NavigationData[];
  selected?: string;
  onClose?: () => void;
  onChange?: any;
  classes?: HvVerticalNavigationPopupClasses;
}

export const HvVerticalNavigationPopup = ({
  id,
  anchorEl,
  fixedMode,
  onClose,
  data,
  selected,
  onChange,
  classes: classesProp,
  ...others
}: HvVerticalNavigationPopupProps) => {
  const { classes } = useClasses(classesProp);

  const handleChange = (event, selectedItem) => {
    onChange(event, selectedItem.id, selectedItem);
  };

  const handleMouseLeave = () => {
    if (!fixedMode) {
      onClose?.();
    }
  };

  return (
    <NavigationPopupContainer
      anchorEl={anchorEl}
      onClose={onClose}
      classes={classes}
      {...others}
    >
      <HvVerticalNavigationTree
        className={classes.popup}
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
