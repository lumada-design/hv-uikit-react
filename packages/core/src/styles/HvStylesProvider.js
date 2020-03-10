import React from "react";
import PropTypes from "prop-types";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider
} from "@material-ui/core/styles";

import { ThemeProvider } from ".";
import JssProvider from "./jss/Provider";

import CssBaseline from "./CssBaseline";

import { themeBuilder } from "../theme";
import muiThemeOverrider from "../theme/muiTheme";

const HvStylesProvider = ({ children, uiKitTheme }) => {
  const customTheme = themeBuilder(uiKitTheme);
  const muiTheme = muiThemeOverrider(customTheme);

  return (
    <JssProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />

        <StylesProvider injectFirst>
          <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
        </StylesProvider>
      </ThemeProvider>
    </JssProvider>
  );
};

HvStylesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Which of design system default themes to use.
   */
  uiKitTheme: PropTypes.oneOf(["dawn", "wicked"])
};

HvStylesProvider.defaultProps = {
  uiKitTheme: "dawn"
};

export default HvStylesProvider;
