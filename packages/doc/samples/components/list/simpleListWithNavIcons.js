import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Today",
    showNavIcon: true
  },
  {
    label: "Yesterday"
  },
  {
    label: "Last week"
  },
  {
    label: "Last month"
  },
  {
    label: "Last year",
    showNavIcon: true
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} selectable={false} />
  </div>
);
