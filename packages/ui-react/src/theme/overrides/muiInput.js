/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import palette from "../palette";

const muiInput = {
  root: {
    border: `1px solid ${palette.secondary.light}`,
    background: palette.background.default,
    height: 40,
    maxHeight: 44,
    minWidth: 70,
    margin: 10,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "14px",
    "&:hover,&:focus&:active": {
      borderColor: palette.primary.light
    }
  },
  inputType: {
    height: 25
  }
};

export default muiInput;
