import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Chart from "../Chart";
import { setData, setLayout } from "./lineChartPlotlyOverrides";
import styles from "./styles";

/**
 * Component responsible for the presentation of the barchart component.
 *
 * @param title
 * @param subtitle
 * @param data
 * @param layout
 * @param config
 * @param tooltipType
 * @returns {*}
 * @constructor
 */
const Linechart = ({
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  tooltipType,
  type,
  xAxisTitle,
  yAxisTitle,
  rangeSlider
}) => {
  const newData = setData(data, type);
  const newLayout = setLayout(layout, rangeSlider);

  return (
    <Chart
      classes={classes}
      title={title}
      subtitle={subtitle}
      xAxisTitle={xAxisTitle}
      yAxisTitle={yAxisTitle}
      data={newData}
      layout={newLayout}
      config={config}
      tooltipType={tooltipType}
    />
  );
};

Linechart.propTypes = {
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

Linechart.defaultProps = {
  classes: null,
  layout: undefined,
  title: "",
  subtitle: "",
  tooltipType: "multiple",
  config: null,
  type: "line",
  xAxisTitle: undefined,
  yAxisTitle: undefined,
  rangeSlider: false
};

export default withStyles(styles, { name: "HvLinechart" })(Linechart);
