/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const withStylesProps = styles => Component => props => {
  const Comp = withStyles(styles(props))(Component);
  return <Comp {...props} />;
};

export default withStylesProps;
