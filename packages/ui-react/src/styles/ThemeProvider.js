/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { MuiThemeProvider } from "@material-ui/core/styles";
import hvTheme from "./theme";

const ThemeProvider = ({ children, theme, sheetsManager }) => (
  <MuiThemeProvider
    theme={theme ? _.merge(hvTheme, theme) : hvTheme}
    sheetsManager={sheetsManager}
  >
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object),
  sheetsManager: PropTypes.instanceOf(Object)
};

ThemeProvider.defaultProps = {
  theme: null,
  sheetsManager: null
};

export default ThemeProvider;
