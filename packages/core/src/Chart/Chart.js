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
import withStyles from "@material-ui/core/styles/withStyles";
import isNil from "lodash/isNil";
import classNames from "classnames";
import Tooltip from "./Tooltip";
import {
  setLayout,
  setLegend,
  setXaxis,
  setYaxis
} from "./chartPlotlyOverrides";
import styleCreator from "./styles";
import Typography from "../Typography";
import Plot from "./Plot";

/**
 * Setter of default layout properties.
 *
 * @param inputLayout
 * @param theme
 * @returns {*}
 */
const propsLayoutSetter = (
  inputLayout,
  theme,
  isHorizontal,
  xAxisTitle,
  yAxisTitle
) => {
  const styles = styleCreator(theme);
  const layout = inputLayout === undefined ? {} : inputLayout;

  // Layout
  setLayout(layout, styles);

  // Legend
  setLegend(layout, styles);

  // Xaxis
  setXaxis(layout, styles, xAxisTitle, isHorizontal);

  // Yaxis
  setYaxis(layout, styles, yAxisTitle, isHorizontal);

  return layout;
};

/**
 * Component responsible for the presentation of the barchart component.
 *
 * @param title
 * @param subtitle
 * @param data
 * @param layout
 * @param config
 * @param tooltipType
 * @returns {*}
 * @constructor
 */
const Chart = ({
  classes,
  theme,
  title,
  subtitle,
  data,
  layout,
  config,
  tooltipType,
  afterPlot,
  xAxisTitle,
  yAxisTitle
}) => {
  const [isHover, setIsHover] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dataTooltip, setDataTooltip] = useState();

  // Check if the barchart is horizontal or vertical.
  const isHorizontal = !isNil(data[0].orientation)
    ? data[0].orientation.toUpperCase() === "H"
    : false;

  const newLayout = propsLayoutSetter(
    layout,
    theme,
    isHorizontal,
    xAxisTitle,
    yAxisTitle
  );

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
        color: p.fullData.marker
          ? p.fullData.marker.color
          : p.fullData.line.color,
        name: p.fullData.name,
        value: isHorizontal ? p.x : p.y
      });
    });

    setDataTooltip(dataFromPoints);

    if (!isHover) setIsHover(true);
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

  const useSingle = tooltipType === "single";

  return (
    <div classes={classes}>
      {isHover && (
        <Tooltip
          coordinates={coordinates}
          data={dataTooltip}
          useSingle={useSingle}
        />
      )}
      <div className={classes.root}>
        <div className={classes.titleContainer}>
          {title && <Typography variant="mTitle">{title}</Typography>}
          <div className={classes.subtitle}>
            {subtitle && <Typography variant="sText">{subtitle}</Typography>}
          </div>
        </div>
        <div
          className={classNames({ [classes.paddingTop]: title })}
          onMouseMove={e => onMouseMove(e)}
        >
          <Plot
            title={title}
            data={data}
            layout={newLayout}
            config={{ responsive: true, displayModeBar: false, ...config }}
            onHover={onHover}
            onUnHover={onUnHover}
            afterPlot={afterPlot}
          />
        </div>
      </div>
    </div>
  );
};

Chart.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * Theme.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * Title of the chart.
   */
  title: PropTypes.string,
  /**
   * Subtitle of the chart.
   */
  subtitle: PropTypes.string,
  /**
   * Plotly data object (see https://plot.ly/javascript/reference/).
   */
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   * Plotly layout object (see https://plot.ly/javascript/reference/#layout).
   */
  layout: PropTypes.instanceOf(Object).isRequired,
  /**
   * Plotly config object (see https://plot.ly/javascript/configuration-options/).
   */
  config: PropTypes.instanceOf(Object),
  /**
   * Defines if should use a single or multiline tooltip.
   */
  tooltipType: PropTypes.oneOf(["single", "multiple"]),
  /**
   * Function to be called after plot render.
   */
  afterPlot: PropTypes.func,
  /**
   * Defines the X axis title.
   */
  xAxisTitle: PropTypes.string,
  /**
   * Defines the Y axis title.
   */
  yAxisTitle: PropTypes.string
};

Chart.defaultProps = {
  classes: null,
  title: "",
  subtitle: "",
  tooltipType: "multiple",
  config: null,
  afterPlot: undefined,
  xAxisTitle: null,
  yAxisTitle: null
};

export default withStyles(styleCreator, { name: "HvChart" })(Chart);
