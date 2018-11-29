/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import icon from "../../../icons/32px/miIcon.svg";

const styles = theme => ({
  companyLogoContainer: {
    position: "relative",
    display: "inherit",
    alignItems: "center"
  },
  companyLogoImage: {
    height: 28,
  },

  companyLogoText: {
    height: 28,
  },

  separator: {
    width: 15,
    height: 28,
    marginRight: 12,
    borderRight: `1px solid ${theme.palette.grey.rainy}`
  },

  companyLogoIcon: {
    background: `url(${icon})`,
    height: "32px",
    width: "32px",
    marginRight: "5px"
  },

  companyLogoText1: {
    color: theme.palette.text.main,
    fontSize: "17px",
    lineHeight: "28px",
    fontWeight: "600",
    letterSpacing: "0.3px"
  },
  companyLogoText2: {
    color: theme.palette.text.main,
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "3.2px",
    lineHeight: "12px"
  }
});

export default styles;
