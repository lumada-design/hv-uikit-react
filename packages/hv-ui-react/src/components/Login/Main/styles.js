/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import background from "./mi-login-bg.png";
import logo from "./mi-hitachi-logo.png";

const styles = theme => ({
  root: {
    position: "absolute",
    background: `url(${background}) 0 / cover fixed`,
    width: "100%",
    height: "100vh",
    zIndex: "-1"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "720px",
    right: 0,
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  logo: {
    position: "absolute",
    top: "20%",
    transform: "translateY(-20%)",
    zIndex: "1"
  },
  logo1: {
    color: "rgb(255, 255, 255)",
    fontSize: "23px",
    fontWeight: 400,
    letterSpacing: "0.1px",
    lineHeight: "25px"
  },
  logo2: {
    color: "rgb(255, 255, 255)",
    fontSize: "33px",
    fontWeight: "bold",
    marginTop: "10px",
    letterSpacing: "2px"
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    "&:before": {
      zIndex: "-1",
      content: '""',
      width: "100%",
      height: "100%",
      background: `url(${background}) 0 / cover fixed`,
      position: "absolute",
      filter: "blur(8px)"
    }
  },
  footer: {
    position: "absolute",
    bottom: "20px",
    zIndex: "1"
  },
  footerLogo: {
    background: `url(${logo}) no-repeat center`,
    backgroundSize: "106px",
    height: "80px"
  },
  footerText: {
    color: "white",
    fontSize: "12px"
  }
});

export default styles;
