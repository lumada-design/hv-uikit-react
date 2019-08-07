import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Arhauss is somewhere",
    selected: false
  },
  {
    label: "Allentown is not are 51",
    selected: false
  },
  {
    label: "Bergamo where you can eat",
    selected: true
  },
  {
    label: "Bergen city",
    selected: false
  },
  {
    label: "Boston of the Seven Seas",
    selected: false
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} multiSelect={true} useSelector />
  </div>
);
