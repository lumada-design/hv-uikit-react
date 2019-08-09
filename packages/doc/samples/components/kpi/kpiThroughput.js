import React from "react";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import Goodsema1S from "@hv/uikit-react-icons/dist/DawnTheme/Good.sema1.S";
import IconArrowUp from "./assets/arrow-green-up.svg";

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
    visualComparison={throughputComparisonVisual()}
  />
);
