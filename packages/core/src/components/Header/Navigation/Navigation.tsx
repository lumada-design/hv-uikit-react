import { clsx } from "clsx";
import { MenuBar } from "./MenuBar";
import { NavigationNav } from "./Navigation.styles";
import { FocusProvider } from "./utils/FocusContext";
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

export interface NavigationProps extends BaseProps<"div", { onClick }> {
  data: NavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
  classes?: {
    root?: string;
  };
}

export const Navigation = ({
  data,
  selected,
  onClick,
  className,
  classes = {},
}: NavigationProps) => {
  const selectionPath = useSelectionPath(data, selected);

  const handleClick = (event, selection) => {
    onClick?.(event, selection);
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <FocusProvider>
        <NavigationNav className={clsx(className, classes.root)}>
          <MenuBar data={data} type="menubar" onClick={handleClick} />
        </NavigationNav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};

Navigation.displayName = "Navigation";
