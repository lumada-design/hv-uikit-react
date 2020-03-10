import React from "react";
import PropTypes from "prop-types";

import HvStylesProvider from "../styles/HvStylesProvider";

import { ConfigProvider } from "../config/context";

const HvProvider = ({ children, uiKitTheme, changeTheme, router }) => {
  const pConfig = { router, changeTheme };

  return (
    <HvStylesProvider theme={uiKitTheme}>
      <ConfigProvider value={pConfig}>{children}</ConfigProvider>
    </HvStylesProvider>
  );
};

HvProvider.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Which of design system default themes to use.
   */
  uiKitTheme: PropTypes.oneOf(["dawn", "wicked"]),
  /**
   * Which of design system default themes to use.
   */
  changeTheme: PropTypes.func,
  /**
   * Configuration object for routing, exposes push and prefetch
   */
  router: PropTypes.instanceOf(Object)
};

HvProvider.defaultProps = {
  router: null,
  uiKitTheme: "dawn",
  changeTheme: () => {}
};

export default HvProvider;
