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
import PropTypes from "prop-types";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";

import NavIcon from "@hv/uikit-react-icons/dist/DawnTheme/DropLeft.XS";
import Typography from "../../Typography";

const onKeyDownHandler = (event, onClick) => {
  
  if (isKeypress(event, KeyboardCodes.Enter)) {
    onClick();
  }
};

const Title = ({ theme, title, classes, onClick }) => (
  <div
    role="button"
    className={classes.titleContainer}
    onClick={onClick}
    tabIndex={0}
    onKeyDown={e => onKeyDownHandler(e, onClick)}
  >
    <div className={classes.navIcon}>
      <NavIcon color={["none", theme.hv.palette.accent.acce1]} />
    </div>
    <Typography className={classes.typography} variant="highlightText">
      {title}
    </Typography>
  </div>
);

Title.propTypes = {
  /**
   * The object created by material to apply to the component.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * Styles applied to the element.
   */
  classes: PropTypes.PropTypes.shape({
    titleContainer: PropTypes.string,
    navIcon: PropTypes.string,
    typography: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Title.defaultProps = {};

export default Title;
