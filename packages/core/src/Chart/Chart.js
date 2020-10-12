import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { useTheme, withStyles } from "@material-ui/core";
import Tooltip from "./Tooltip";
import { applyLayoutDefaults, applyConfigDefaults } from "./chartPlotlyOverrides";

import Plot from "./Plot";
import styles from "./styles";

const Chart = ({
  id,
  classes,
  data,
  layout,
  config,
  tooltipType = "multiple",
  afterPlot,
  xAxisTitle,
  yAxisTitle,
  ...others
}) => {
  const theme = useTheme();

  /* Values derived from props */

  // Check if the barchart is horizontal or vertical.
  const isHorizontal = useMemo(
    () => (!isNil(data[0]?.orientation) ? data[0].orientation.toUpperCase() === "H" : false),
    [data]
  );

  const chartLayout = useMemo(
    () => applyLayoutDefaults(layout, theme, isHorizontal, xAxisTitle, yAxisTitle),
    [isHorizontal, layout, theme, xAxisTitle, yAxisTitle]
  );

  const chartConfig = useMemo(() => applyConfigDefaults(config), [config]);

  const useSingle = tooltipType === "single";

  /* State */

  const [isHover, setIsHover] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dataTooltip, setDataTooltip] = useState();

  /* Callbacks */

  // Extract data from the plotly onHover event to be used to create the tooltip.
  const onHover = useCallback(
    (event) => {
      const { points } = event;

      const dataFromPoints = {
        title: "",
        elements: [],
      };

      points.forEach((p, i) => {
        const fData = p.fullData;
        const pNumber = p.pointNumber;

        if (i === 0) dataFromPoints.title = isHorizontal ? p.y : p.x || fData.name;

        dataFromPoints.elements.push({
          color: fData.marker?.color || fData.line?.color || p.color,
          name: fData.labels?.[pNumber] || fData.name,
          value: isHorizontal ? p.x : p.y || p.value,
        });
      });

      setDataTooltip(dataFromPoints);
      setIsHover(true);
    },
    [isHorizontal]
  );

  const onUnHover = useCallback(() => {
    setIsHover(false);
  }, []);

  const onMouseMove = useCallback((event) => {
    setCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  return (
    <>
      {isHover && <Tooltip coordinates={coordinates} data={dataTooltip} useSingle={useSingle} />}
      <div id={id} className={classes.root}>
        <div onMouseMove={onMouseMove}>
          <Plot
            data={data}
            layout={chartLayout}
            config={chartConfig}
            onHover={onHover}
            onUnHover={onUnHover}
            afterPlot={afterPlot}
            {...others}
          />
        </div>
      </div>
    </>
  );
};

Chart.propTypes = {
  /**
   * An Id passed on to the component
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),

  /**
   * Plotly data object (see https://plot.ly/javascript/reference/).
   */
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   * Plotly layout object (see https://plot.ly/javascript/reference/#layout).
   */
  layout: PropTypes.instanceOf(Object).isRequired,
  /**
   * Plotly config object (see https://plot.ly/javascript/configuration-options/).
   */
  config: PropTypes.instanceOf(Object),
  /**
   * Defines if should use a single or multiline tooltip.
   */
  tooltipType: PropTypes.oneOf(["single", "multiple"]),
  /**
   * Function to be called after plot render.
   */
  afterPlot: PropTypes.func,
  /**
   * Defines the X axis title.
   */
  xAxisTitle: PropTypes.string,
  /**
   * Defines the Y axis title.
   */
  yAxisTitle: PropTypes.string,
  /**
   * Defines the chart subtitle.
   */
  subtitle: PropTypes.string,
};

export default withStyles(styles, { name: "HvChart" })(Chart);
