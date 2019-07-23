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
import isNil from "lodash/isNil";
import Barchart from "./Barchart";
import Tooltip from "./Tooltip";

/**
 * Component responsible for the presentation of the barchart component.
 *
 * @param title
 * @param subtitle
 * @param data
 * @param layout
 * @param config
 * @param useSingle
 * @returns {*}
 * @constructor
 */
const BarchartControl = ({
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  useSingle
}) => {
  const [isHover, setIsHover] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dataTooltip, setDataTooltip] = useState();

  // Check if the barchart is horizontal or vertical.
  const isHorizontal = !isNil(data[0].orientation)
    ? data[0].orientation.toUpperCase() === "H"
    : false;

  /**
   * Extract data from the plotly onHover event to be used to create the tooltip.
   *
   * @param eventData
   */
  const onHover = eventData => {
    const dataFromPoints = {
      title: isHorizontal ? eventData.points[0].y : eventData.points[0].x,
      elements: []
    };
    eventData.points.forEach(p => {
      dataFromPoints.elements.push({
        color: p.fullData.marker.color,
        name: p.fullData.name,
        value: isHorizontal ? p.x : p.y
      });
    });

    setDataTooltip(dataFromPoints);

    setIsHover(true);
  };

  const onUnHover = () => setIsHover(false);

  /**
   * Obtains the cursor coordinates to send to the tooltip.
   * @param eventData
   */
  const onMouseMove = eventData => {
    setCoordinates({
      x: eventData.pageX,
      y: eventData.pageY
    });
  };

  return (
    <div classes={classes}>
      {isHover && (
        <Tooltip
          coordinates={coordinates}
          data={dataTooltip}
          useSingle={useSingle}
        />
      )}
      <Barchart
        title={title}
        subtitle={subtitle}
        data={data}
        layout={layout}
        config={{ responsive: true, displayModeBar: false, ...config }}
        onHover={onHover}
        onUnHover={onUnHover}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};

BarchartControl.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * Title of the chart.
   */
  title: PropTypes.string,
  /**
   * Subtitle of the chart.
   */
  subtitle: PropTypes.string,
  /**
   * Plotly data object.
   */
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   * Plotly layout object.
   */
  layout: PropTypes.instanceOf(Object).isRequired,
  /**
   * Plotly config object.
   */
  config: PropTypes.instanceOf(Object),
  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle: PropTypes.bool
};

BarchartControl.defaultProps = {
  classes: null,
  title: "",
  subtitle: "",
  useSingle: false,
  config: null
};

export default BarchartControl;
