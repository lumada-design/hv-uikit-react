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
  useLayoutEffect(() => {
    if (afterPlot) afterPlotInternal();
  }, []);

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
