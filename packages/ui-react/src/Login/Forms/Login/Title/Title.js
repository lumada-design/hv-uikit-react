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
import Typography from "@material-ui/core/Typography";

/**
 * Builds the title component. This component can be render by the props:
 *  - titletext - overrides the default "Welcome" text.
 *  - logo - an url for a icon to be used in junction with the titletext.
 *  - titleComponent - a component to be render, overriding the titletext.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Title = ({ classes, logo, titleText, titleComponent }) => {
  let logoComponent = null;
  let span = null;

  if (titleComponent !== null) {
    return <div className={classes.logoContainer}>{titleComponent}</div>;
  }

  if (logo != null) {
    logoComponent = (
      <img src={logo} className={classes.logoImage} alt="Company logo" />
    );
    span = <span className={classes.separator} />;
  }
  return (
    <div className={classes.logoContainer}>
      {logoComponent}
      {span}
      <Typography variant="h3" className={classes.root}>
        {titleText}
      </Typography>
    </div>
  );
};

Title.propTypes = {
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * the welcome message
   */
  titleText: PropTypes.string,
  /**
   * the url for the logo in the welcome message.
   */
  logo: PropTypes.string,
  /**
   * a component to replace the welcome message
   */
  titleComponent: PropTypes.node
};

Title.defaultProps = {
  logo: "",
  titleText: "Welcome",
  titleComponent: null
};

export default Title;
