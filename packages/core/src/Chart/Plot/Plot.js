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
import equals from "lodash/isEqual";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Plotly plot.
 *
 * @param classes
 * @param data
 * @param layoutclasses
 * @param onHover
 * @param onUnHover
 * @returns {*}
 * @constructor
 */
const Plot = ({ data, layout, config, onHover, onUnHover, afterPlot }) => {
  const [revision, setRevision] = useState(0);
  const [newData, setNewData] = useState(data);

  const PlotGraph = createPlotlyComponent(Plotly);

  const ref = useRef(null);

  const afterPlotInternal = () => {
    const afterData = afterPlot(newData, ref);
    if (afterData) {
      setNewData(afterData);
      setRevision(revision + 1);
    }
  };

  /**
   * Call in the first render.
   */
  if (afterPlot) {
    useLayoutEffect(afterPlotInternal, []);
  }

  return (
    <div ref={ref}>
      <PlotGraph
        data={newData}
        layout={layout}
        config={config}
        revision={revision}
        onHover={eventData => onHover(eventData)}
        onUnhover={eventData => onUnHover(eventData)}
        onAfterPlot={afterPlot && afterPlotInternal}
        style={{ position: "relative" }}
      />
    </div>
  );
};

Plot.propTypes = {
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
   * OnHover function.
   */
  onHover: PropTypes.func,
  /**
   * OnUnHover function.
   */
  onUnHover: PropTypes.func,
  /**
   * Function to be call after plot render.
   */
  afterPlot: PropTypes.func
};

Plot.defaultProps = {
  onHover: null,
  onUnHover: null,
  afterPlot: undefined
};

const arePropsEqual = (prevProps, nextProps) =>
  equals(prevProps.data, nextProps.data) &&
  equals(prevProps.layout, nextProps.layout);

export default withStyles(styles, { name: "HvChartPlot" })(
  memo(Plot, arePropsEqual)
);
