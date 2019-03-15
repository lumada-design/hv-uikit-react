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
import classNames from "classnames";
import CardHeader from "@material-ui/core/CardHeader";

/**
 * The header container that possesses three slots:
 * - icon
 * - title
 * - subheader
 *
 * @param {*} { classes, HeaderTitle, Subheader, Icon, needsBorder }
 */
const Header = ({ classes, HeaderTitle, Subheader, Icon, needsBorder }) => (
  <CardHeader
    title={HeaderTitle}
    className={classNames(classes.root, {
      [classes.bottomBorder]: needsBorder
    })}
    subheader={Subheader}
    action={Icon}
    classes={{
      title: classes.title,
      subheader: classes.subheader,
      action: classes.action
    }}
  />
);

Header.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.instanceOf(Object),
    /**
     * Style applied to the bottom border of the component is needed.
     */
    bottomBorder: PropTypes.instanceOf(Object),
    /**
     * Styles applied to the title Typography element.
     */
    title: PropTypes.instanceOf(Object),
    /**
     * Styles applied to the subheader Typography element.
     */
    subheader: PropTypes.instanceOf(Object),
    /**
     * Styles applied to the action element.
     */
    action: PropTypes.instanceOf(Object),
    /**
     *
     */
    icon: PropTypes.instanceOf(Object),
    /**
     *
     */
    info: PropTypes.instanceOf(Object),
    /**
     *
     */
    warning: PropTypes.instanceOf(Object),
    /**
     *
     */
    critical: PropTypes.instanceOf(Object)
  }).isRequired,
  /**
   *  The renderable content inside the title slot of the header.
   */
  HeaderTitle: PropTypes.node.isRequired,
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  Subheader: PropTypes.node,
  /**
   * If the Header requires a bottom border
   */
  needsBorder: PropTypes.bool,

  /**
   *  The renderable content inside the icon slot of the header.
   */
  Icon: PropTypes.node
};

Header.defaultProps = {
  needsBorder: false,
  Icon: null,
  Subheader: undefined
};

export default Header;
