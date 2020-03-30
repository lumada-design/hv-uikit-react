import React from "react";

const withLabels = defaultLabels => Component => props => (
  <Component {...props} labels={{ ...defaultLabels, ...props.labels }} />
);

export default withLabels;
