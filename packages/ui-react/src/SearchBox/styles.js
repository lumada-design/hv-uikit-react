/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const root = theme => ({
  position: "relative",
  background: theme.palette.atmosphere.atmo1,
  height: "32px", 
  paddingLeft: `${theme.spacing.xs}px`,
  paddingRight: `${theme.spacing.md}px`
});

const icon = {
  position: "absolute",
  right: 0,
  width: "32px",
  height: "32px"
};

const styles = theme => ({
  rootWithoutInput: {
    ...root(theme),
    border: `1px solid ${theme.palette.atmosphere.atmo6}`,
  },
  rootWithInput: {
    ...root(theme),
    border: `1px solid ${theme.palette.accent.acce1}`,
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
