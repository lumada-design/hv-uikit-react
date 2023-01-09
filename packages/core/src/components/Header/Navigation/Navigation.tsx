import { clsx } from "clsx";
import { useSelectionPath } from "hooks";
import { HvBaseProps } from "types";
import { HvMenuBar } from "./MenuBar";
import { StyledNav } from "./Navigation.styles";
import { FocusProvider } from "./utils/FocusContext";
import { SelectionContext } from "./utils/SelectionContext";

export interface HvNavigationItemProp {
  id: string;
  label: string;
  path?: string;
  href?: string;
  target?: string;
  data?: HvNavigationItemProp[];
}

export type HvNavigationProps = HvBaseProps<HTMLDivElement, { onClick }> & {
  data: HvNavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: HvNavigationItemProp) => void;
  classes?: {
    root?: string;
  };
};

export const HvNavigation = ({
  data,
  selected,
  onClick,
  className,
  classes = {},
}: HvNavigationProps) => {
  const selectionPath = useSelectionPath(data, selected);

  const handleClick = (event, selection) => {
    onClick?.(event, selection);
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <FocusProvider>
        <StyledNav className={clsx(className, classes.root)}>
          <HvMenuBar data={data} type="menubar" onClick={handleClick} />
        </StyledNav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};
