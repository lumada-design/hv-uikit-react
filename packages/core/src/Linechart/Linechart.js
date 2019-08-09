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
import Chart from "../Chart";
import setData from "./lineChartPlotlyOverrides";

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
const Linechart = ({
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  tooltipType,
  type,
  xAxisTitle,
  yAxisTitle
}) => {
  const newData = setData(data, type);

  return (
    <Chart
      classes={classes}
      title={title}
      subtitle={subtitle}
      xAxisTitle={xAxisTitle}
      yAxisTitle={yAxisTitle}
      data={newData}
      layout={layout}
      config={config}
      tooltipType={tooltipType}
    />
  );
};

Linechart.propTypes = {
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
   * Plotly data object (see https://plot.ly/javascript/reference/).
   */
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   * Plotly layout object (see https://plot.ly/javascript/reference/#layout).
   */
  layout: PropTypes.instanceOf(Object),
  /**
   * Plotly config object (see https://plot.ly/javascript/configuration-options/).
   */
  config: PropTypes.instanceOf(Object),
  /**
   * Defines if should use a single or multiline tooltip.
   */
  tooltipType: PropTypes.oneOf(["single", "multiple"]),
  /**
   * Sets the type of graph.
   */
  type: PropTypes.oneOf(["line", "area", "stack"]),
  /**
   * Defines the title of the X axis.
   */
  xAxisTitle: PropTypes.string,
  /**
   * Defines the title of the Y axis.
   */
  yAxisTitle: PropTypes.string
};

Linechart.defaultProps = {
  classes: null,
  layout: {},
  title: "",
  subtitle: "",
  tooltipType: "multiple",
  config: null,
  type: "line",
  xAxisTitle: undefined,
  yAxisTitle: undefined
};

export default Linechart;
