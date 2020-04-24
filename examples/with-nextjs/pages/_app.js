/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";

import App from "next/app";
import Head from "next/head";

import HvProvider from "@hv/uikit-react-core/dist/Provider";

import getPageContext from "../src/getPageContext";

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>UI React - with next.js</title>
        </Head>

        <HvProvider
          sheetsRegistry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
          <Component pageContext={this.pageContext} {...pageProps} />
        </HvProvider>
      </>
    );
  }
}

export default MyApp;
