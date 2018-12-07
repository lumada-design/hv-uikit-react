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
import withConfig from "../config/withConfig";

const HvLink = props => {
  const { classes, children, href, config, useRouter } = props;

  const handleClick = e => {
    if (useRouter && config.router) {
      e.preventDefault();
      config.router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={classes.a}>
      {children}
    </a>
  );
};

HvLink.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  config: PropTypes.instanceOf(Object).isRequired,
  useRouter: PropTypes.bool
};

HvLink.defaultProps = {
  useRouter: false
};

export default withConfig(HvLink);
