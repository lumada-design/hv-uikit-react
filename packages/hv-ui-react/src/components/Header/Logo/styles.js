/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import hitachiLogo from "./hitachi-logo.png";
import lumadaLogo from "./lumada-logo.png";

const styles = theme => ({
  companylogoContainer: {
    position: "relative",
    height: 28,
    width: 230
  },
  companyLogoImage: {
    position: "absolute",
    background: `url(${hitachiLogo}) no-repeat`,
    backgroundSize: "100px 28px",
    backgroundPosition: "0",
    width: 120,
    height: 28,
    borderRight: `1px solid ${theme.palette.grey.rainy}`
  },
  companyLogoText: {
    position: "absolute",
    marginLeft: 140,
    top: -4
  },
  companyLogoText1: {
    color: theme.palette.text.main,
    fontSize: "12px",
    fontWeight: "200",
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
