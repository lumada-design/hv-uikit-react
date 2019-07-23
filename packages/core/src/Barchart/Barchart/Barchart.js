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

import React, { memo, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { isNil, fill, clone } from "lodash";
import classNames from "classnames";
import Typography from "../../Typography";
import propSetter from "./plotlyOverrides";

import styleCreator from "./styles";

const MARGIN = 50;
const MAX_BAR_WIDTH = 90;

/**
 * Setter of default properties.
 *
 * @param inputLayout
 * @param theme
 * @returns {*}
 */
const propsSetter = (inputLayout, theme, isHorizontal) => {
  const styles = styleCreator(theme);
  const layout = inputLayout;

  // Layout
  propSetter.setLayout(layout, styles);

  // Legend
  propSetter.setLegend(layout, styles);

  // Xaxis
  propSetter.setXaxis(layout, styles, isHorizontal);

  // Yaxis
  propSetter.setYaxis(layout, styles, isHorizontal);

  return layout;
};

/**
 * Plotly barchart.
 *
 * @param classes
 * @param theme
 * @param title
 * @param subtitle
 * @param data
 * @param layout
 * @param onHover
 * @param onUnHover
 * @param onMouseMove
 * @returns {*}
 * @constructor
 */
const BarChart = ({
  classes,
  theme,
  title,
  subtitle,
  data,
  layout,
  config,
  onHover,
  onUnHover,
  onMouseMove
}) => {
  const [revision, setRevision] = useState(0);
  const [newData, setNewData] = useState(data);
  const isHorizontal = !isNil(data[0].orientation)
    ? data[0].orientation.toUpperCase() === "H"
    : false;
  const newLayout = propsSetter(layout, theme, isHorizontal);

  const { bargap, bargroupgap, barmode } = layout;
  const isStack = barmode === "stack";
  const numberOfBarsByGroup = isStack ? 1 : data.length;
  const numberOfGroup = data[0].x.length;

  const Plot = createPlotlyComponent(Plotly);

  const ref = useRef(null);

  /**
   * Used to force the max width of each bar with 90px.
   */
  const recalculateBarWidth = () => {
    const { width } = ref.current.getBoundingClientRect();
    const plotWidth = width - MARGIN;
    const groupWidth = plotWidth / numberOfGroup;
    const colWidth =
      groupWidth * (1 - bargap) - groupWidth * (1 - bargap) * bargroupgap;

    const greaterThan90 = colWidth / numberOfBarsByGroup > MAX_BAR_WIDTH;
    const isAlreadyGreaterThan90 = newData[0].width !== undefined;

    if (greaterThan90) {
      const newWidth = (MAX_BAR_WIDTH / plotWidth) * numberOfGroup;

      newData.map(subData => {
        // eslint-disable-next-line no-param-reassign
        subData.width = fill(clone(subData.x), newWidth);
        return subData;
      });

      setNewData(newData);
      setRevision(revision + 1);
    }

    if (!greaterThan90 && isAlreadyGreaterThan90) {
      newData.map(subData => {
        // eslint-disable-next-line no-param-reassign
        subData.width = undefined;
        return subData;
      });
      setNewData(newData);
      setRevision(revision + 1);
    }
  };

  /**
   * Call in the first render.
   */
  useLayoutEffect(() => recalculateBarWidth(), []);

  return (
    <div className={classes.root} onMouseMove={e => onMouseMove(e)}>
      <div className={classes.titleContainer}>
        {title && <Typography variant="mTitle">{title}</Typography>}
        <div className={classes.subtitle}>
          {subtitle && <Typography variant="infoText">{subtitle}</Typography>}
        </div>
      </div>
      <div ref={ref} className={classNames({ [classes.paddingTop]: title })}>
        <Plot
          data={newData}
          layout={newLayout}
          config={config}
          revision={revision}
          onHover={eventData => onHover(eventData)}
          onUnhover={eventData => onUnHover(eventData)}
          onAfterPlot={() => recalculateBarWidth("onAfterPlot")}
          style={{ position: "relative" }}
        />
      </div>
    </div>
  );
};

BarChart.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the barchart root class.
     */
    root: PropTypes.string
  }).isRequired,
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
  config: PropTypes.instanceOf(Object).isRequired,
  /**
   * Theme.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * OnHover function.
   */
  onHover: PropTypes.func,
  /**
   * OnUnHover function.
   */
  onUnHover: PropTypes.func,
  /**
   * OnMouseMove function.
   */
  onMouseMove: PropTypes.func
};

BarChart.defaultProps = {
  title: "",
  subtitle: "",
  onHover: null,
  onUnHover: null,
  onMouseMove: null
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.subtitle === nextProps.subtitle &&
  prevProps.data === nextProps.data &&
  prevProps.layout === nextProps.layout;

export default memo(BarChart, arePropsEqual);
