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
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import withConfig from "../../config/withConfig";
import HvButton , { buttonTypes } from "../../Button";
import Link from "../../Link";

const Footer = ({ classes, data, basePath, useRouter }) => {
  const path = `${basePath}${data.id}`;

  return (
    <CardActions className={classes.root}>
      <Link href={path} useRouter={useRouter}>
        <HvButton type={buttonTypes.primary}>View</HvButton>
      </Link>
      <HvButton type={buttonTypes.secondary} disabled>Dismiss</HvButton>
      <HvButton type={buttonTypes.secondary} disabled>Assign</HvButton>
    </CardActions>
  );
};

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  basePath: PropTypes.string.isRequired,
  useRouter: PropTypes.bool.isRequired
};

export default withConfig(Footer);
