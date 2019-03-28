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

import React from "react";
import MoreOptions from "@hv-ui/icons/core/icons/MoreOptionsHorizontal.S";
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
