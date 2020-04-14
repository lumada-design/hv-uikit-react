import React from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";

const withLabels = defaultLabels => Component => {
  const WithLabels = ({ labels, ...others }) => (
    <Component {...others} labels={{ ...defaultLabels, ...labels }} />
  );

  WithLabels.propTypes = {
    /**
     * Labels to be applied in the component.
     */
    // eslint-disable-next-line react/forbid-prop-types
    labels: PropTypes.object
  };

  // make it visible to documentation
  WithLabels.defaultLabels = defaultLabels;

  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics(WithLabels, Component);

  if (process.env.NODE_ENV !== "production") {
    WithLabels.Naked = Component;
  }

  return WithLabels;
};

export default withLabels;
