/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import {
  convertHexToRGB,
  fade
} from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  let convertedColor;
  if (
    theme &&
    theme.palette &&
    theme.palette.grey &&
    theme.palette.grey.smokey
  ) {
    convertedColor = fade(convertHexToRGB(theme.palette.grey.smokey), 0.8);
  }

  return {
    background: {
      background: convertedColor
    },
    paper: {
      background: `${theme.palette.grey.smokey}`,
      border: `solid 1px ${theme.palette.grey.plain}`,
      padding: "40px"
    },
    closeButton: {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 0,
      margin: `${theme.spacing.xs}px`,
      width: 32,
      minWidth: 32,
      "& > span": {
        width: 32
      },
      "&:hover" : {
        backgroundColor: "transparent"
      }
    }
  };
};

export default styles;
