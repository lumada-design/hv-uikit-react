/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*  TODO: Review accessibility */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import withConfig from "../config/withConfig";
import styles from "./styles";

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
      onClick,
      tabIndex,
      ...other
    } = this.props;

    const handleClick = e => {
      if (isKeypress(e, KeyboardCodes.Tab)) return;
      if (useRouter && config.router) {
        onClick({ route, params });
        e.preventDefault();
        config.router.push(route, params, options);
      }
    };

    return useRouter ? (
      <div
        onClick={handleClick}
        role="button"
        className={classes.a}
        onKeyDown={handleClick}
        tabIndex={tabIndex}
        {...other}
      >
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
  onClick: PropTypes.func,
  tabIndex: PropTypes.number
};

HvLink.defaultProps = {
  useRouter: false,
  params: {},
  options: {},
  tabIndex: 0,
  onClick: () => {}
};

export default withStyles(styles, { name: "HvLink" })(withConfig(HvLink));
