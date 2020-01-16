import React from "react";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import Success from "@hv/uikit-react-icons/dist/Generic/Level0.Good";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import ArrowUp from "@hv/uikit-react-icons/dist/Generic/UpXS";
import withStyles from "@material-ui/core/styles/withStyles";

const labels = {
  title: "Avg. service time",
  indicator: "124 14",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "10%"
};

const averageComparisonVisualAverage = () => (
  <div
    style={{
      position: "relative",
      top: "1px"
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

const kpiContainer = {
  minWidth: "190px",
  padding: "20px"
}

const StyledFailureIcon = withStyles(iconStyles, {
  withTheme: true
})(() => <Success semantic="sema1" />);

const icon = () => <StyledFailureIcon />;

export default (
  <div style={kpiContainer}>
    <HvKpi
      labels={labels}
      visualIndicator={icon()}
      visualComparison={averageComparisonVisualAverage()}
    />
  </div>
);
