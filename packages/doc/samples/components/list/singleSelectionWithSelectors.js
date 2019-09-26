import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "98001, Store Manager"
  },
  {
    label: "98002, Store Manager"
  },
  {
    label: "98003, Store Manager"
  },
  {
    label: "98004, Store Manager",
    disabled: true
  },
  {
    label: "98005, Store Manager"
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} selectDefault useSelector />
  </div>
);