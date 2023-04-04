import { clsx } from "clsx";
import { MouseEvent } from "react";
import { useSelectionPath } from "~/hooks";
import { HvBaseProps } from "../../../types";
import { HvMenuBar } from "./MenuBar";
import { StyledNav } from "./Navigation.styles";
import { FocusProvider } from "./utils/FocusContext";
import { SelectionContext } from "./utils/SelectionContext";
import headerNavigationClasses, {
  HvHeaderNavigationClasses,
} from "./navigationClasses";

export interface HvHeaderNavigationItemProp {
  id: string;
  label: string;
  path?: string;
  href?: string;
  target?: string;
  data?: HvHeaderNavigationItemProp[];
}

export type HvHeaderNavigationProps = HvBaseProps<
  HTMLDivElement,
  { onClick }
> & {
  data: HvHeaderNavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: HvHeaderNavigationItemProp) => void;
  classes?: HvHeaderNavigationClasses;
};

export const HvHeaderNavigation = ({
  data,
  selected,
  onClick,
  className,
  classes,
  ...others
}: HvHeaderNavigationProps) => {
  const selectionPath = useSelectionPath(data, selected);

  const handleClick = (event, selection) => {
    event.preventDefault();

    onClick?.(event, selection);
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <FocusProvider>
        <StyledNav
          className={clsx(
            className,
            headerNavigationClasses.root,
            classes?.root
          )}
          {...others}
        >
          <HvMenuBar data={data} type="menubar" onClick={handleClick} />
        </StyledNav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};
