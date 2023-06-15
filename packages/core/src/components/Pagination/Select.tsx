import { useState } from "react";
import { HvBaseDropdown, HvSelectionList, HvListItem, HvPanel } from "..";
import { useClasses } from "./Select.styles";

export const Option = ({ children, ...others }) => (
  <HvListItem {...others}>{children}</HvListItem>
);

const HvSelect = ({
  className,
  classes: classesProp = {},
  onChange,
  disabled,
  value,
  children,
  ...others
}) => {
  const { classes } = useClasses(classesProp);
  const [open, setOpen] = useState(false);

  const handleSelect = (evt, val) => {
    onChange?.(evt, val);
    setOpen(false);
  };

  const handleToggle = (_evt, s) => {
    setOpen(s);
  };

  const setFocusToContent = (containerRef) => {
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
