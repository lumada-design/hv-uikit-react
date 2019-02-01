/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import search from "../assets/Search-16.svg";

const styles = theme => ({
  search: {
    height: "inherit",
    margin: "0",
    border: "none",
    width: "calc(100% - 32px)"
  },
  searchContainer: {
    display: "flex",
    background: theme.palette.grey.smokey,
    borderBottom: `1px solid ${theme.palette.grey.rainy}`,
    height: "32px",
    margin: "10px 20px"
  },
  iconContainer: {
    width: "32px",
    height: "32px",
  },
  input: {
    padding:"10px 0px 10px 10px",
  },
  icon: {
    width: "16px",
    height: "16px",
    padding: "8px",
    background: `url(${search})`
  },
  searchIcon: {
    background: `url(${search})`
  }
});

export default styles;
