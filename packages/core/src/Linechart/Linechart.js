import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Chart from "../Chart";
import { setData, setLayout } from "./lineChartPlotlyOverrides";
import styles from "./styles";

const Linechart = ({
  id,
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  tooltipType = "multiple",
  type = "line",
  xAxisTitle,
  yAxisTitle,
  rangeSlider = false,
  ...others
}) => {
  const newData = setData(data, type);
  const newLayout = setLayout(layout, rangeSlider);

  return (
    <Chart
      id={id}
      classes={classes}
      title={title}
      subtitle={subtitle}
      xAxisTitle={xAxisTitle}
      yAxisTitle={yAxisTitle}
      data={newData}
      layout={newLayout}
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
   * Title of the chart.
   */
  title: PropTypes.string,
  /**
   * Subtitle of the chart.
   */
  subtitle: PropTypes.string,
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
   * Defines the title of the X axis.
   */
  xAxisTitle: PropTypes.string,
  /**
   * Defines the title of the Y axis.
   */
  yAxisTitle: PropTypes.string,
  /**
   * Defines it should present a range slider.
   */
  rangeSlider: PropTypes.bool
};

export default withStyles(styles, { name: "HvLinechart" })(Linechart);
