/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { HvBaseDropdown, HvSelectionList, HvListItem, HvPanel, HvTypography } from "..";

const styles = (theme) => ({
  root: {
    borderRadius: 2,
    "& $header": {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    "& $headerOpen": {
      backgroundColor: theme.palette.atmo1,
      borderColor: theme.palette.atmo1,
    },
  },
  header: {},
  headerOpen: {},
});

export const Option = ({ children, ...others }) => <HvListItem {...others}>{children}</HvListItem>;

const HvSelect = ({ classes, onChange, disabled, value, children, ...others }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (evt, val) => {
    onChange?.(evt, val);
    setOpen(false);
  };

  const handleToggle = (_evt, s) => {
    setOpen(s);
  };

  return (
    <HvBaseDropdown
      classes={classes}
      expanded={open}
      onToggle={handleToggle}
      placeholder={<HvTypography>{value}</HvTypography>}
      disabled={disabled}
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
