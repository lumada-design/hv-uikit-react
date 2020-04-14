import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const withStylesProps = styles => Component => props => {
  const Comp = withStyles(styles(props))(Component);
  return <Comp {...props} />;
};

export default withStylesProps;
