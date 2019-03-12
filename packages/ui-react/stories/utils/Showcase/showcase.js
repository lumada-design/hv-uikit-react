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

const HvShowCase = props => {
  const {
    classes,
    className,
    style,
    children,
    description,
    title,
    width,
    ...other
  } = props;

  return (
    <div className={classes.container} style={style} {...other}>
      <h3 className={classes.header}>{title}</h3>
      <p className={classes.description}>{description}</p>
      <p />
      {children}
    </div>
  );
};

HvShowCase.propTypes = {
  /**
   * Class names to be applied to the root.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the showcase.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The content inside the showcase component.
   */
  children: PropTypes.node,
  /**
   * The description on top of the component being showcased.
   */
  description: PropTypes.string,
  /**
   * The style object to apply inline.
   */
  style: PropTypes.instanceOf(Object),
  /**
   * The title of the component to be showcase
   */
  title: PropTypes.string
};

HvShowCase.defaultProps = {
  className: "",
  children: null,
  description: "",
  title: "",
  style: {}
};

export default HvShowCase;
