/* eslint-disable react/prop-types */

import React, { cloneElement, useState } from "react";
import { withStyles } from "@material-ui/core";
import { HvBaseDropdown, HvListContainer, HvListItem, HvPanel, HvTypography } from "..";

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

export const Option = ({ children, onClick }) => (
  <HvListItem onClick={onClick}>{children}</HvListItem>
);

const HvSelect = ({ classes, onChange, disabled, value, children, ...others }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (evt, val) => {
    onChange?.(evt, val);
    setOpen(false);
  };

  const handleToggle = (evt, s) => {
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
        <HvListContainer selectable condensed>
          {React.Children.map(children, (child) =>
            cloneElement(child, { onClick: (evt) => handleSelect(evt, child.props.value) })
          )}
        </HvListContainer>
      </HvPanel>
    </HvBaseDropdown>
  );
};

export default withStyles(styles)(HvSelect);
