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
import diff from "deep-diff";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ConfigProvider } from "../config/context";
import hvTheme from "../theme";


/**
 * Augments the target theme with the differences found in the source theme.
 *
 * @param {Object} targetTheme - A material UI Theme to be changed.
 * @param {Object} sourceTheme - A material UI Theme to apply on top.
 * @returns {Object|undefined} - A modified material UI theme.
 */
const applyCustomTheme = (targetTheme, sourceTheme) => {
  const deleteDifference = "D";
  if(!_.isNil(targetTheme) && 
     !_.isNil(sourceTheme) && 
     !_.isEmpty(targetTheme) &&
     !_.isEmpty(sourceTheme)) {
      diff.observableDiff(createMuiTheme({}), sourceTheme, (difference) => {
      const a = _.set({} ,difference.path,difference.rhs);
      if(difference.kind !== deleteDifference) {// Do not include the differences of type "delete"
        _.merge(targetTheme, a);
      }
    });
    return targetTheme;
  }
  return undefined;
}

const HvProvider = ({ children, theme, router }) => {
  const pConfig = { router };
  return (
    <MuiThemeProvider theme={applyCustomTheme({...hvTheme}, {...theme})} sheetsManager={new Map()}>
      <ConfigProvider value={pConfig}>{children}</ConfigProvider>
    </MuiThemeProvider>
  );
};

HvProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.instanceOf(Object),
  router: PropTypes.instanceOf(Object)
};

HvProvider.defaultProps = {
  theme: null,
  router: null
};

export default HvProvider;
