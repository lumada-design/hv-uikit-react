import React from "react";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import Success from "@hv/uikit-react-icons/dist/Generic/Level0.Good";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import IconArrowUp from "./assets/arrow-green-up.svg";
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
      top:"1px"
    }}
  >
    <div
      style={{
        color: "#008000",
        position: "absolute",
        width: "32px",
        height: "32px",
        top: "4px",
        left: "-3px",
        background: `url(${IconArrowUp}) no-repeat`
      }}
      color="#008000"
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
    height: "30px",
    paddingTop: "3px"
}

const StyledFailureIcon = () => <Success semantic="sema1" boxStyles={iconStyles} style={{display: "block", margin: "auto"}}/>;

const icon = () => <StyledFailureIcon />;

export default (
  <HvKpi
    labels={labels}
    visualIndicator={icon()}
    visualComparison={averageComparisonVisualAverage()}
  />
);
