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
import withConfig from "../../../config/withConfig";
import Button from "../../Button";
import Link from "../../Link";

const Footer = ({ classes, data, config, useRouter }) => {
  const path = `${config.basePath.card}${data.id}`;

  return (
    <CardActions className={classes.root}>
      <Link href={path} useRouter={useRouter}>
        <Button>View</Button>
      </Link>
      <Button disabled>Dismiss</Button>
      <Button disabled>Assign</Button>
    </CardActions>
  );
};

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  config: PropTypes.instanceOf(Object).isRequired,
  useRouter: PropTypes.bool
};

Footer.defaultProps = {
  useRouter: false
};

export default withConfig(Footer);
