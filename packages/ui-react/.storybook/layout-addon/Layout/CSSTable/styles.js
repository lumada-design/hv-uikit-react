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
  table: {
    ...theme.hv.typography.normalText,
    fontSie: 1,
    borderCollapse: "collapse",
    "& tr": {
    },
    "& th": {
      padding: "10px",
      textAlign: "left",
      borderBottom: `1px solid ${theme.palette.grey.rainy}`,
    },
    "& td": {
      padding: "10px",
      minWidth:"150px",
      borderBottom: `1px solid ${theme.palette.grey.rainy}`
    }
  }
});

export default styles;
