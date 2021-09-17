import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Chart from "../Chart";
import { applyDataDefaults, applyLayoutDefaults } from "./lineChartPlotlyOverrides";
import styles from "./styles";

/**
 * A line chart or line plot or line graph is a type of chart which displays information as a series of data points
 * called 'markers' connected by straight line segments. It is a basic type of chart common in many fields.
 * Our implementation leverages the Plotly charting library. If you have a specific case
 * that we don't cover, the Plotly [documentation](https://plotly.com/javascript/) is a good starting point.
 */
const Linechart = ({
  id,
  classes,
  data,
  layout,
  config,
  tooltipType = "multiple",
  type = "line",
  rangeSlider = false,
  ...others
}) => {
  /* Values derived from props */

  const chartData = useMemo(() => applyDataDefaults(data, type), [data, type]);
  const chartLayout = useMemo(
    () => applyLayoutDefaults(layout, rangeSlider),
    [layout, rangeSlider]
  );

  return (
    <Chart
      id={id}
      classes={classes}
      data={chartData}
      layout={chartLayout}
      config={config}
      tooltipType={tooltipType}
      {...others}
    />
  );
};

Linechart.propTypes = {
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
  type: PropTypes.oneOf(["line", "area", "stack"]),
  /**
   * Defines it should present a range slider.
   */
  rangeSlider: PropTypes.bool,
};

export default withStyles(styles, { name: "HvLinechart" })(Linechart);
