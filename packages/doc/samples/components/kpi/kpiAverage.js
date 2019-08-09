import React from "react";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import Goodsema1S from "@hv/uikit-react-icons/dist/DawnTheme/Good.sema1.S";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import IconArrowUp from "./assets/arrow-green-up.svg";

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

const icon = () => <Goodsema1S />;

export default (
  <HvKpi
    labels={labels}
    visualIndicator={icon()}
    visualComparison={averageComparisonVisualAverage()}
  />
);
