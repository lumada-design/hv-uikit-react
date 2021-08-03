/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { HvBaseDropdown, HvSelectionList, HvListItem, HvPanel, HvTypography } from "..";

const styles = (theme) => ({
  root: {
    borderRadius: 2,
    width: "auto",
    "& > div$anchor": {
      width: "auto",
    },
    "& $header": {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    "& $headerOpen": {
      backgroundColor: theme.palette.atmo1,
      borderColor: theme.palette.atmo1,
    },
  },
  anchor: {},
  header: {},
  headerOpen: {},
});

export const Option = ({ children, ...others }) => <HvListItem {...others}>{children}</HvListItem>;

const HvSelect = ({ className, classes, onChange, disabled, value, children, ...others }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (evt, val) => {
    onChange?.(evt, val);
    setOpen(false);
  };

  const handleToggle = (_evt, s) => {
    setOpen(s);
  };

  const setFocusToContent = (containerRef) => {
    const listItems = [...containerRef?.getElementsByTagName("li")];
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
      classes={classes}
      expanded={open}
      onToggle={handleToggle}
      onContainerCreation={setFocusToContent}
      placeholder={<HvTypography>{value}</HvTypography>}
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

export default withStyles(styles)(HvSelect);
