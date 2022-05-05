import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Chart from "../Chart";
import { applyDataDefaults, applyLayoutDefaults } from "./donutchartPlotlyOverrides";
import styles from "./styles";

/**
 * Donut charts nicely convey the part-whole relationship and they have become
 * the most recognizable chart types for representing proportions in business and data statistics.
 * Our implementation leverages the Plotly charting library. If you have a specific case
 * that we don't cover, the Plotly [documentation](https://plotly.com/javascript/) is a good starting point.
 */
const Donutchart = ({
  id,
  classes,
  data,
  layout,
  config,
  tooltipType = "multiple",
  type = "regular",
  ...others
}) => {
  /* Values derived from props */

  const chartData = useMemo(() => applyDataDefaults(data, type), [data, type]);
  const chartLayout = useMemo(() => applyLayoutDefaults(layout), [layout]);

  return (
    <Chart
      id={id}
      classes={classes}
      data={chartData}
      layout={chartLayout}
      config={config}
      tooltipType={tooltipType}
      type={type}
      {...others}
    />
  );
};

Donutchart.propTypes = {
  /**
   * An Id passed on to the component
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.instanceOf(Object),
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
  type: PropTypes.oneOf(["regular", "thin"]),
};

export default withStyles(styles, { name: "HvDonutchart" })(Donutchart);
