import { clsx } from "clsx";
import { BaseProps } from "types/base";
import { HeaderNavigationNav } from "./HeaderNavigation.styles";
import { MenuBar } from "./MenuBar";
import SelectionContext from "./utils/SelectionContext";
import useSelectionPath from "./utils/useSelectionPath";

export interface NavigationItemProp {
  id: string;
  label: string;
  path?: string;
  href?: string;
  target?: string;
  data?: NavigationItemProp[];
}

export interface HeaderNavigationProps extends BaseProps<"div", { onClick }> {
  data: NavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
  classes?: {
    root?: string;
  };
}

export const HeaderNavigation = ({
  data,
  selected,
  onClick,
  className,
  classes = {},
}: HeaderNavigationProps) => {
  const selectionPath = useSelectionPath(data, selected);

  const handleClick = (event, selection) => {
    onClick?.(event, selection);
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <HeaderNavigationNav className={clsx(className, classes.root)}>
        <MenuBar data={data} type="menubar" onClick={handleClick} />
      </HeaderNavigationNav>
    </SelectionContext.Provider>
  );
};

HeaderNavigation.displayName = "HeaderNavigation";
