import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { ConfigConsumer } from "./context";

const withConfig = Component => {
  const WithConfig = props => (
    <ConfigConsumer>{config => <Component {...props} config={config} />}</ConfigConsumer>
  );

  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics(WithConfig, Component);

  if (process.env.NODE_ENV !== "production") {
    WithConfig.Naked = Component;
  }

  return WithConfig;
};

export default withConfig;
