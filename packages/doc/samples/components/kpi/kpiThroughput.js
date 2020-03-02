import React from "react";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import Success from "@hv/uikit-react-icons/dist/Level0.Good";
import ArrowUp from "@hv/uikit-react-icons/dist/UpXS";
import withStyles from "@material-ui/core/styles/withStyles";

const labels = {
  title: "Total throughput",
  indicator: "16,699.82",
  unit: "MB/S",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "60%"
};

const throughputComparisonVisual = () => (
  <div
    style={{
      position: "relative"
    }}
  >
    <ArrowUp
      style={{
        position: "absolute",
        top: "16px",
        left: "-1px"
      }}
      semantic="sema1"
    />
    <HvTypography
      style={{
        position: "relative",
        paddingLeft: "16px"
      }}
      variant="highlightText"
    >
      {labels.comparisonIndicator}
    </HvTypography>
  </div>
);

const iconStyles = {
  width: "30px",
  height: "30px"
};

const StyledFailureIcon = withStyles(iconStyles, {
  withTheme: true
})(() => <Success semantic="sema1" />);

const icon = () => <StyledFailureIcon />;

const kpiContainer = {
  minWidth: "190px",
  padding: "20px"
}

export default (
  <div style={kpiContainer}>
    <HvKpi
      labels={labels}
      visualIndicator={icon()}
      visualComparison={throughputComparisonVisual()}
    />
  </div>
);
