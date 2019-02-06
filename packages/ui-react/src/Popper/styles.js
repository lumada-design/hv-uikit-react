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
  popper: {
    zIndex: 998
  },
  content: {
    display: "inline-block",
    border: `solid 1px ${theme.palette.grey.plain} `,
    padding: "10px 12px",
    maxWidth: 532
  },
  contentKey: {
    fontWeight: 600,
    display: "inline-block",
    padding: "10px 5px 10px 8px"
  },
  contentValue: {
    display: "inline-block",
    float: "right",
    padding: "10px 8px 10px 5px"
  }
});

export default styles;
