import React from "react";
import PropTypes from "prop-types";
import { clone, fill } from "lodash";
import { withStyles } from "@material-ui/core";
import Chart from "../Chart";
import { setData, setLayout } from "./barchartPlotlyOverrides";
import styles from "./styles";

const MARGIN = 50;
const MAX_BAR_WIDTH = 90;

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
const Barchart = ({
  classes,
  title,
  subtitle,
  data,
  layout,
  config,
  tooltipType,
  stack,
  horizontal,
  xAxisTitle,
  yAxisTitle
}) => {
  const newLayout = setLayout(layout, stack);
  const newData = setData(data, horizontal);

  const { barmode, bargap, bargroupgap } = newLayout;

  const isStack = barmode === "stack";
  const numberOfBarsByGroup = isStack ? 1 : newData.length;
  const numberOfGroup = newData[0].x.length;

  /**
   * Used to force the max width of each bar with 90px.
   */
  const recalculateBarWidth = (plotData, ref) => {
    const { width } = ref.current.getBoundingClientRect();
    const plotWidth = width - MARGIN;
    const groupWidth = plotWidth / numberOfGroup;
    const colWidth =
      groupWidth * (1 - bargap) - groupWidth * (1 - bargap) * bargroupgap;

    const greaterThan90 = colWidth / numberOfBarsByGroup > MAX_BAR_WIDTH;
    const isAlreadyGreaterThan90 = plotData[0].width !== undefined;

    if (greaterThan90) {
      const newWidth = (MAX_BAR_WIDTH / plotWidth) * numberOfGroup;

      plotData.map(subData => {
        // eslint-disable-next-line no-param-reassign
        subData.width = fill(clone(subData.x), newWidth);
        return subData;
      });

      return plotData;
    }

    if (!greaterThan90 && isAlreadyGreaterThan90) {
      plotData.map(subData => {
        // eslint-disable-next-line no-param-reassign
        subData.width = undefined;
        return subData;
      });
      return plotData;
    }

    return null;
  };

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
      afterPlot={recalculateBarWidth}
    />
  );
};
Barchart.propTypes = {
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
   * Sets is the chart is stack.
   */
  stack: PropTypes.bool,
  /**
   * Sets is the chart is horizontal.
   */
  horizontal: PropTypes.bool,
  /**
   * Defines the title of the X axis.
   */
  xAxisTitle: PropTypes.string,
  /**
   * Defines the title of the Y axis.
   */
  yAxisTitle: PropTypes.string
};

Barchart.defaultProps = {
  classes: null,
  layout: undefined,
  title: "",
  subtitle: "",
  tooltipType: "multiple",
  config: null,
  stack: false,
  horizontal: false,
  xAxisTitle: undefined,
  yAxisTitle: undefined
};

export default withStyles(styles, { name: "HvBarchart" })(Barchart);
