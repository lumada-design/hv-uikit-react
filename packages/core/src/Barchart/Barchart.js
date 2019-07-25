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
import { clone, fill } from "lodash";
import Chart from "../Chart";
import propSetter from "./plotlyOverrides";

const MARGIN = 50;
const MAX_BAR_WIDTH = 90;

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
const Barchart = ({
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  useSingle
}) => {
  const newLayout = propSetter.setLayout(layout);
  const newData = propSetter.setData(data);

  const { barmode, bargap, bargroupgap } = layout;

  const isStack = barmode === "stack";
  const numberOfBarsByGroup = isStack ? 1 : data.length;
  const numberOfGroup = data[0].x.length;

  /**
   * Used to force the max width of each bar with 90px.
   */
  const recalculateBarWidth = (plotData, ref) => {
    const { width } = ref.current.getBoundingClientRect();
    const plotWidth = width - MARGIN;
    const groupWidth = plotWidth / numberOfGroup;
    const colWidth =
      groupWidth * (1 - bargap) - groupWidth * (1 - bargap) * bargroupgap;

    const greaterThan90 = colWidth / numberOfBarsByGroup > MAX_BAR_WIDTH;
    const isAlreadyGreaterThan90 = plotData[0].width !== undefined;

    if (greaterThan90) {
      const newWidth = (MAX_BAR_WIDTH / plotWidth) * numberOfGroup;

      plotData.map(subData => {
        // eslint-disable-next-line no-param-reassign
        subData.width = fill(clone(subData.x), newWidth);
        return subData;
      });

      return plotData;
    }

    if (!greaterThan90 && isAlreadyGreaterThan90) {
      plotData.map(subData => {
        // eslint-disable-next-line no-param-reassign
        subData.width = undefined;
        return subData;
      });
      return plotData;
    }

    return null;
  };

  return (
    <Chart
      classes={classes}
      title={title}
      subtitle={subtitle}
      data={newData}
      layout={newLayout}
      config={config}
      useSingle={useSingle}
      afterPlot={recalculateBarWidth}
    />
  );
};
Barchart.propTypes = {
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

Barchart.defaultProps = {
  classes: null,
  title: "",
  subtitle: "",
  useSingle: false,
  config: null
};

export default Barchart;
