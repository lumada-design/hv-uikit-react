import React from "react";
import PropTypes from "prop-types";
import HvWizardContext from "./WizardContext";

const WizardContextProvider = ({ value, children }) => {
  return <HvWizardContext.Provider value={value}>{children}</HvWizardContext.Provider>;
};

WizardContextProvider.propTypes = {
  /**
   * Initial context value
   */
  value: PropTypes.shape({
    /**
     * Initial context object
     */
    context: PropTypes.shape({}),
    /**
     * Function to modify the context
     */
    setContext: PropTypes.func,
  }),
  /**
   * Child components for the Wizard
   */
  children: PropTypes.node.isRequired,
};

export default WizardContextProvider;
