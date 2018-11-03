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
import hvTheme from "./theme";

const HvThemeProvider = ({ children, theme }) => {
  const t = _.merge(hvTheme, theme);

  return (
    <MuiThemeProvider
      theme={t}
      sheetsManager={new Map()}
    >
      {children}
    </MuiThemeProvider>
  )
};

HvThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object)
};

HvThemeProvider.defaultProps = {
  theme: null
};

export default HvThemeProvider;
