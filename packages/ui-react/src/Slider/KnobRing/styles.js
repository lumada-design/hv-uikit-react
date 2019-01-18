/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = props => {
  const { hoverColor, dragging } = props;
  let borderValue = "0px solid transparent";
  if (!dragging && hoverColor) {
    borderValue = `9px solid ${hoverColor}`;
  }

  return {
    knobRing: {
      position: "relative",
      borderColor: "transparent",
      borderRadius: "50%",
      boxShadow: "none",
      backgroundColor: "transparent",
      width: "32px",
      height: "32px",
      top: "-82%",
      left: "-82%",
      "&:hover": {
        border: borderValue
      },
      "&:active": {
        border: borderValue
      }
    }
  };
};

export default styles;
