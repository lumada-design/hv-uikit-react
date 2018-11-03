/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import _ from "lodash";
import React from "react";
import App from "next/app";
import { HvThemeProvider } from "@hv-ui/react";
import theme from "../app/theme";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const props = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { props };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, props } = this.props;

    return (
      <HvThemeProvider theme={theme}>
        <Component {...props} />
      </HvThemeProvider>
    );
  }
}

export default MyApp;
