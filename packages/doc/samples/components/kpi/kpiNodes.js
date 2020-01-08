import React from "react";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";

const labels = {
  title: "Nodes",
  indicator: "34 677"
};

const kpiContainer = {
  minWidth: "190px",
  padding: "20px"
}

export default (
  <div style={kpiContainer}>
    <HvKpi labels={labels} />
  </div>
);
