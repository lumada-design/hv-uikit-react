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

class HvLink extends React.Component {
  componentDidMount() {
    const { config, useRouter, route, params } = this.props;

    if (useRouter && config.router) {
      config.router.prefetch(route, params);
    }
  }

  render() {
    const {
      classes,
      children,
      route,
      params,
      options,
      config,
      useRouter,
      onClick
    } = this.props;

    const handleClick = e => {
      if (useRouter && config.router) {
        onClick({ route, params });
        e.preventDefault();
        config.router.push(route, params, options);
      }
    };

    return useRouter ? (
      <div onClick={handleClick} className={classes.a}>
        {children}
      </div>
    ) : (
      <a href={route} className={classes.a}>
        {children}
      </a>
    );
  }
}

HvLink.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.node.isRequired,
  route: PropTypes.string.isRequired,
  params: PropTypes.instanceOf(Object),
  options: PropTypes.instanceOf(Object),
  config: PropTypes.instanceOf(Object).isRequired,
  useRouter: PropTypes.bool,
  onClick: PropTypes.func
};

HvLink.defaultProps = {
  useRouter: false,
  params: {},
  options: {},
  onClick: () => {}
};

export default withConfig(HvLink);
