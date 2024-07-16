import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvBaseProps } from "../../types/generic";
import { setId } from "../../utils/setId";
import {
  HvVerticalNavigationTree,
  HvVerticalNavigationTreeProps,
} from "../Navigation";
import { NavigationData } from "../VerticalNavigationContext";
import { useClasses } from "./NavigationPopup.styles";
import {
  HvVerticalNavigationPopupClasses,
  NavigationPopupContainer,
} from "./NavigationPopupContainer";

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

export const HvVerticalNavigationPopup = (
  props: HvVerticalNavigationPopupProps,
) => {
  const {
    id,
    anchorEl,
    fixedMode,
    onClose,
    data,
    selected,
    onChange,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvVerticalNavigationPopup", props);

  const { classes } = useClasses(classesProp);

  const handleChange: HvVerticalNavigationTreeProps["onChange"] = (
    event,
    selectedItem,
  ) => onChange(event, selectedItem.id, selectedItem);

  const handleMouseLeave = () => {
    if (fixedMode) return;
    onClose?.();
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
