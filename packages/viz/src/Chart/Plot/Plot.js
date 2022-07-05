import React, { useLayoutEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const PlotGraph = createPlotlyComponent(Plotly);

const plotGraphStyle = { position: "relative" };

const Plot = ({ data, layout, config, revision = 0, onHover, onUnHover, afterPlot, ...others }) => {
  const ref = useRef(null);

  /* Callbacks */

  const afterPlotInternal = useCallback(() => {
    afterPlot?.(ref);
  }, [afterPlot]);

  /* Effects */

  /**
   * Call in the first render because react-plotly.js won't do so.
   * (https://github.com/plotly/react-plotly.js/blob/bd15ca98be12b159633fb57c4ea762cb7a64c3a7/src/factory.js#L88)
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(afterPlotInternal, []);

  return (
    <PlotGraph
      ref={ref}
      data={data}
      layout={layout}
      config={config}
      revision={revision}
      onHover={onHover}
      onUnhover={onUnHover}
      onAfterPlot={afterPlot != null ? afterPlotInternal : null}
      style={plotGraphStyle}
      {...others}
    />
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
  revision: PropTypes.number,
};

export default withStyles(styles, { name: "HvChartPlot" })(Plot);
