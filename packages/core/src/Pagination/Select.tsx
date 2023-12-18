import { SyntheticEvent, useState } from "react";

import { HvBaseDropdown, HvBaseDropdownProps } from "../BaseDropdown";
import { HvSelectionList, HvSelectionListProps } from "../SelectionList";
import { HvPanel } from "../Panel";
import { HvListItem, HvListItemProps } from "../ListContainer";

import { useDefaultProps } from "../hooks/useDefaultProps";

import { useClasses } from "./Select.styles";

export const Option = ({ ...props }: Partial<HvListItemProps>) => (
  <HvListItem {...props} />
);

export interface HvPaginationSelectProps
  extends Omit<HvBaseDropdownProps, "onChange"> {
  onChange: (event: React.SyntheticEvent, val: number) => void;
  value: number;
}

const HvSelect = (props: HvPaginationSelectProps) => {
  const {
    className,
    classes: classesProp,
    onChange,
    disabled,
    value,
    children,
    ...others
  } = useDefaultProps("HvPaginationSelect", props);
  const { classes } = useClasses(classesProp);
  const [open, setOpen] = useState(false);

  const handleSelect: HvSelectionListProps["onChange"] = (evt, val) => {
    onChange?.(evt, val);
    setOpen(false);
  };

  const handleToggle: HvBaseDropdownProps["onToggle"] = (_evt, s) => {
    setOpen(s);
  };

  const setFocusToContent: HvBaseDropdownProps["onContainerCreation"] = (
    containerRef
  ) => {
    const listItems =
      containerRef != null ? [...containerRef.getElementsByTagName("li")] : [];
    listItems.every((listItem) => {
      if (listItem.tabIndex >= 0) {
        listItem.focus();
        return false;
      }
      return true;
    });
  };

  return (
    <HvBaseDropdown
      className={className}
      classes={{
        selection: classes.selection,
        header: classes.header,
        headerOpen: classes.headerOpen,
      }}
      expanded={open}
      onToggle={handleToggle}
      onContainerCreation={setFocusToContent}
      placeholder={value}
      disabled={disabled}
      variableWidth
      {...others}
    >
      <HvPanel>
        <HvSelectionList value={value} onChange={handleSelect}>
          {children}
        </HvSelectionList>
      </HvPanel>
    </HvBaseDropdown>
  );
};

export default HvSelect;
