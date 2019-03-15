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
import MoreOptions from "@hv-ui/icons/core/S-icons/MoreOptionsHorizontal16";
import PropTypes from "prop-types";
import DropDownMenu from "@hv-ui/react/core/DropDownMenu";
import Link from "../../Link";

/**
 *
 * @param classes
 * @param subMenuList
 * @param useRouter
 * @returns {*}
 * @constructor
 */
const SubMenu = ({ classes, subMenuList, useRouter }) => {

  const list = subMenuList.map((elem, i) => {
    const key = `${elem.label}_${i}`;

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link key={key} route={elem.path} useRouter={useRouter}>
        <div className={classes.menuItem}>{elem.label}</div>
      </Link>
    );
  });

  return (
    <DropDownMenu
      icon={<MoreOptions />}
      classes={{
        menuList: classes.menuList,
        iconSelected: classes.iconSelected
      }}
      position="right"
    >
      {list}
    </DropDownMenu>
  );
};

SubMenu.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape().isRequired,
  /**
   * Array for creating the
   */
  subMenuList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired,
  /**
   *
   */
  useRouter: PropTypes.bool
};

SubMenu.defaultProps = {
  useRouter: false
};

export default SubMenu;
