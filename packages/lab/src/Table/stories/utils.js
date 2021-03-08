import { useState } from "react";

const getRand = (id) => (Math.abs(Math.sin(id)) * 10 ** 4) % 1;
const newEntry = (value, i) => {
  const r = getRand(i);
  return {
    id: `${i}`,
    name: `Event ${i}`,
    createdDate: "10/14/2018",
    eventType: "Anomaly detection",
    status: i % 2 === 0 ? "Closed" : "Open",
    riskScore: `${100 - i}%`,
    severity: (r > 0.66 && "Critical") || (r > 0.33 && "Major") || "Minor",
    priority: (r > 0.66 && "High") || (r > 0.33 && "Medium") || "Low",
  };
};

export const makeData = (len = 10) => Array.from(Array(len), newEntry);

// https://react-table.tanstack.com/docs/api/useTable#column-options
export const getColumns = () => [
  { Header: "Title", accessor: "name" },
  { Header: "Time", accessor: "createdDate" },
  { Header: "Event Type", accessor: "eventType" },
  { Header: "Status", accessor: "status" },
  { Header: "Probability", accessor: "riskScore", align: "right" },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

export const useToggleIndex = (initialState) => {
  const [index, setIndex] = useState(initialState);

  const toggleState = (idx) => () => {
    setIndex(idx === index ? -1 : idx);
  };

  return [index, toggleState];
};
