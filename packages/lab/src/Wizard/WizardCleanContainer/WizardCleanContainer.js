import React from "react";
import PropTypes from "prop-types";

const HvWizardCleanContainer = ({ className, children }) => (
  <div className={className}>{children}</div>
);

HvWizardCleanContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default HvWizardCleanContainer;
