/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const icon = {
  position: "absolute",
  right: 0,
  width: "32px",
  height: "32px"
};

const styles = theme => ({
  root: {
    position: "relative",
    background: theme.palette.grey.foggy,
    borderBottom: `1px solid ${theme.palette.grey.plain}`,
    height: "32px",
    paddingLeft: `${theme.spacing.xs}px`,
    paddingRight: `${theme.spacing.md}px`
  },
  input: {
    border: "none",
    height: "32px",
    width: "100%",
    background: "transparent",
    ...theme.typography.body1,
    "&:focus": {
      outline: "none"
    },
    "&::placeholder": {
      ...theme.typography.disabled
    }
  },
  icon: {
    ...icon
  },
  iconClear: {
    ...icon,
    cursor: "pointer"
  }
});

export default styles;
