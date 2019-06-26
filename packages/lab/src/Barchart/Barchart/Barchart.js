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

import React, { memo } from "react";
import PropTypes from "prop-types";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import isNil from "lodash/isNil";
import styleCreator from "./styles";

/**
 * Setter of default properties.
 *
 * @param layout
 * @param theme
 * @returns {*}
 */
const propsSetter = (layout, theme) => {
  const styles = styleCreator(theme);
  const newLayout = layout;

  newLayout.colorway = Object.values(styles.defaultColors);

  if (isNil(newLayout.legend)) newLayout.legend = {};

  newLayout.legend.font = {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  };

  newLayout.plot_bgcolor = theme.hv.palette.atmosphere.atmo1;

  newLayout.paper_bgcolor = theme.hv.palette.atmosphere.atmo1;

  if (isNil(newLayout.xaxis)) newLayout.xaxis = {};
  newLayout.xaxis.linecolor = styles.lineColor.color;

  if (isNil(newLayout.xaxis.title)) newLayout.xaxis.title = {};
  newLayout.xaxis.title.font = {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  };

  newLayout.xaxis.tickcolor = styles.lineColor.color;
  newLayout.xaxis.gridcolor = theme.hv.palette.atmosphere.atmo5;
  newLayout.xaxis.tickfont = {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  };

  if (isNil(newLayout.yaxis)) newLayout.yaxis = {};
  newLayout.yaxis.linecolor = styles.lineColor.color;
  newLayout.yaxis.gridcolor = theme.hv.palette.atmosphere.atmo5;

  if (isNil(newLayout.yaxis.title)) newLayout.yaxis.title = {};

  newLayout.yaxis.title.font = {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  };
  newLayout.yaxis.tickcolor = styles.lineColor.color;
  newLayout.yaxis.tickfont = {
    family: styles.vizText.fontFamily,
    size: styles.vizText.fontSize,
    color: styles.vizText.color
  };

  return newLayout;
};

/**
 * Ploty barchart.
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
  const Plot = createPlotlyComponent(Plotly);
  const newLayout = propsSetter(layout, theme);

  return (
    <div className={classes.root} onMouseMove={e => onMouseMove(e)}>
      <div className={classes.titleContainer}>
        {title && <Typography variant="mTitle">{title}</Typography>}
        <div className={classes.subtitle}>
          {subtitle && <Typography variant="infoText">{subtitle}</Typography>}
        </div>
      </div>
      <Plot
        data={data}
        layout={newLayout}
        config={config}
        onHover={eventData => onHover(eventData)}
        onUnhover={eventData => onUnHover(eventData)}
      />
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
