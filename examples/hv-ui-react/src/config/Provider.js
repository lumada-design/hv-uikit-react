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
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core/styles";
import hvDefaults, { ConfigProvider } from ".";
import hvTheme from "../theme";

const HvProvider = ({ children, theme, router, defaults }) => {
  const pTheme = _.merge(hvTheme, theme);
  const pConfig = _.assign(hvDefaults, defaults, { router });

  return (
    <MuiThemeProvider theme={pTheme} sheetsManager={new Map()}>
      <ConfigProvider value={pConfig}>{children}</ConfigProvider>
    </MuiThemeProvider>
  );
};

HvProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object),
  router: PropTypes.instanceOf(Object),
  defaults: PropTypes.instanceOf(Object)
};

HvProvider.defaultProps = {
  theme: null,
  router: null,
  defaults: null
};

export default HvProvider;
