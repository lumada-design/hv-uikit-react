import React from "react";
import PropTypes from "prop-types";

import { JssProvider } from "react-jss";

import jss from "./instance";

const HvJssProvider = ({ children }) => {
  return <JssProvider jss={jss}>{children}</JssProvider>;
};

HvJssProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default HvJssProvider;
