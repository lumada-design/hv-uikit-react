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
import CardContent from "@material-ui/core/CardContent";
import classNames from "classnames";

/**
 * The content container.
 *
 * @param {Object} { classes, InnerCardContent, needsBorder, ...other }
 */
const Content = ({ classes, InnerCardContent, needsBorder, ...other }) => (
  <CardContent
    className={classNames(classes.content, {
      [classes.bottomBorder]: needsBorder
    })}
    {...other}
  >
    {InnerCardContent}
  </CardContent>
);

Content.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   *  The renderable content inside the body of the card.
   */
  InnerCardContent: PropTypes.node,
  /**
   * If the content requires a bottom border
   */
  needsBorder: PropTypes.bool
};

Content.defaultProps = {
  InnerCardContent: undefined,
  needsBorder: false
};

export default Content;
