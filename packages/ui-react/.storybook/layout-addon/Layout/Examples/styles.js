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
  root: {
    borderBottom: `1px solid ${theme.palette.grey.rainy}`,
    lineHeight: "50px",
    marginTop: 40
  },
  titleContainer: {
    marginBottom: "10px",
    display: "flex",
    "alignItems": "center"
  },
  content: {
    border: `1px solid ${theme.palette.grey.rainy}`,
    marginBottom: "30px"
  },
  component: {
    backgroundColor: theme.palette.common.white,
    padding: "20px"
  },
  iconCode:{
    marginLeft: "auto"
  }
});

export default styles;
