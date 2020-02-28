import React from "react";
import { ConfigConsumer } from "./context";

const withConfig = Component => props => (
  <ConfigConsumer>
    {config => <Component {...props} config={config} />}
  </ConfigConsumer>
);

export default withConfig;
