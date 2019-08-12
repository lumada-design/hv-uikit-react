import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    id: "1",
    label: "Arhauss is somewhere",
    selected: false
  },
  {
    id: "2",
    label: "Allentown is not are 51",
    selected: false
  },
  {
    id: "3",
    label: "Bergamo where you can eat",
    selected: true
  },
  {
    id: "4",
    label: "Bergen city",
    selected: false
  },
  {
    id: "5",
    label: "Bergen city",
    selected: false
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} multiSelect={true} useSelector />
  </div>
);
