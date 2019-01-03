/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  root:{
    border: `1px solid ${theme.palette.grey.plain}`
  },
  button: {
    margin: 0,
    display: "block",
    textAlign: "left",
    minWidth: "93px",
    border: "none",
    "&:hover": {
      border: "none"
    },
    "&:active": {
      border: "none"
    },
    "&$disabled": {
      border: "none"
    }
  }
});

export default styles;
