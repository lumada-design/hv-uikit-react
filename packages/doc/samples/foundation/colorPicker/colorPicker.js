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


import React, { useState } from "react";
import PropTypes from "prop-types";
import HvList from "@hv/uikit-react-core/dist/List";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvButton from "@hv/uikit-react-core/dist/Button";
import { SketchPicker } from 'react-color';

const ColorPicker = ({ classes, applyCallback, clearCallback }) => {
  const [colorList, setColorList] = useState([]);

  const [currentColor, setColor] = useState("#fff");

  const handleChange = color => {
    setColor(color.hex);
  };

  const addColor = () => {
    let newColorList = [...colorList];
    newColorList.push({ label: currentColor });
    setColorList(newColorList);
  };

  const clearColor = () => {
    setColorList([]);
    clearCallback();
  };

  const apply = () => {
    applyCallback(colorList);
  };

  return (
    <div className={classes.root}>
      <div className={classes.controlsContainer}>
        <HvTypography variant="labelText" className={classes.groupName}>
          ColorPicker
        </HvTypography>
        <SketchPicker color={currentColor} onChangeComplete={handleChange} />
        <div>
          <HvButton className={classes.button} onClick={addColor}>Add</HvButton>
          <HvButton className={classes.button} onClick={apply}>Apply</HvButton>
          <HvButton className={classes.button} onClick={clearColor}>Clear All</HvButton>
        </div>
      </div>
      <div className={classes.selectionContainer}>
        {colorList.length > 0 && (
          <div>
            <HvList values={colorList} selectable={false} />
          </div>
        )}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  applyCallback: PropTypes.func,
  clearCallback: PropTypes.func
};

ColorPicker.defaultProps = {
  applyCallback: () => {}
};

export default ColorPicker;
