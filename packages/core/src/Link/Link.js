/*  TODO: Review accessibility */

import React from "react";
import PropTypes from "prop-types";
import withStyles from "../styles/withStyles";
import { KeyboardCodes, isKeypress } from "../utils/KeyboardUtils";
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
