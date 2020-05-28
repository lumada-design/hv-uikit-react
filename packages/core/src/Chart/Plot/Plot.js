import React, { memo, useLayoutEffect, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import equals from "lodash/isEqual";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const Plot = ({ data, layout, config, revision = 0, onHover, onUnHover, afterPlot, ...others }) => {
  const [plotRevision, setPlotRevision] = useState(revision);
  const [newData, setNewData] = useState(data);

  useEffect(() => setNewData(data), [data]);

  useEffect(() => setPlotRevision(revision), [revision]);

  const PlotGraph = createPlotlyComponent(Plotly);

  const ref = useRef(null);

  const afterPlotInternal = () => {
    const afterData = afterPlot?.(newData, ref);
    if (afterData) {
      setNewData(afterData);
      setPlotRevision(plotRevision + 1);
    }
  };

  /**
   * Call in the first render.
   */
  useLayoutEffect(afterPlotInternal, []);

  return (
    <div ref={ref}>
      <PlotGraph
        data={newData}
        layout={layout}
        config={config}
        revision={plotRevision}
        onHover={(event, eventData) => onHover(event, eventData)}
        onUnhover={(event, eventData) => onUnHover(event, eventData)}
        onAfterPlot={afterPlot && afterPlotInternal}
        style={{ position: "relative" }}
        {...others}
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
  afterPlot: PropTypes.func,
  /**
   * Plot revision.
   */
  revision: PropTypes.number
};

const arePropsEqual = (prevProps, nextProps) =>
  equals(prevProps.data, nextProps.data) && equals(prevProps.layout, nextProps.layout);

export default withStyles(styles, { name: "HvChartPlot" })(memo(Plot, arePropsEqual));
