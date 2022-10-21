import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Chart from "../Chart";
import CustomTooltip from "./CustomTooltip";
import { applyDataDefaults, applyLayoutDefaults } from "./confusionMatrixPlotlyOverrides";
import styles from "./styles";

const ConfusionMatrix = ({
  id,
  classes,
  data,
  layout,
  config,
  tooltip,
  deltaMatrix,
  ...others
}) => {
  const theme = useTheme();
  const dataWithDefaults = useMemo(
    () => applyDataDefaults(data, theme, deltaMatrix),
    [data, theme, deltaMatrix]
  );
  const layoutWithDefaults = useMemo(
    () => applyLayoutDefaults(layout, theme, dataWithDefaults, deltaMatrix),
    [layout, theme, dataWithDefaults, deltaMatrix]
  );

  return (
    <Chart
      id={id}
      classes={classes}
      data={dataWithDefaults}
      layout={layoutWithDefaults}
      config={config}
      tooltip={
        tooltip ??
        ((tooltipData) => <CustomTooltip data={tooltipData} deltaMatrix={!!deltaMatrix} />)
      }
      {...others}
    />
  );
};

ConfusionMatrix.propTypes = {
  /**
   *
   */
  id: PropTypes.string,
  /**
   *
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  /**
   *
   */
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   *
   */
  layout: PropTypes.instanceOf(Object),
  /**
   *
   */
  config: PropTypes.instanceOf(Object),
  /**
   *
   */
  tooltip: PropTypes.func,
  /**
   *
   */
  deltaMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

export default withStyles(styles, { name: "HvConfusionMatrix" })(ConfusionMatrix);
