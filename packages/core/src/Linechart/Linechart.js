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
import propSetter from "./plotlyOverrides";

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
const Linechart = ({
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  useSingle,
  type
}) => {
  const newData = propSetter.setData(data, type);

  return (
    <Chart
      classes={classes}
      title={title}
      subtitle={subtitle}
      data={newData}
      layout={layout}
      config={config}
      useSingle={useSingle}
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
  useSingle: PropTypes.bool,
  type: PropTypes.oneOf(["line", "area", "stack"])
};

Linechart.defaultProps = {
  classes: null,
  title: "",
  subtitle: "",
  useSingle: false,
  config: null,
  type: "line"
};

export default Linechart;
