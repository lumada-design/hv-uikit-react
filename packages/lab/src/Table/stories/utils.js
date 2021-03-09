import { useState } from "react";
import range from "lodash/range";
import { Random } from "@hv/uikit-react-core";

const rand = new Random();

const formatDate = (date) => date.toISOString().split("T")[0];

const newEntry = (value, i) => {
  const [r1, r2] = range(2).map(() => rand.next());
  const [dateMax, dateMin] = [1640995200000, 1514764800000];
  return {
    id: `${i}`,
    name: `Event ${i}`,
    createdDate: formatDate(new Date(rand.next(dateMax, dateMin))),
    eventType: "Anomaly detection",
    status: i % 2 === 0 ? "Closed" : "Open",
    riskScore: rand.next(100, 10),
    severity: (r1 > 0.66 && "Critical") || (r1 > 0.33 && "Major") || "Minor",
    priority: (r2 > 0.66 && "High") || (r2 > 0.33 && "Medium") || "Low",
  };
};

export const makeData = (len = 10) => Array.from(Array(len), newEntry);

// https://react-table.tanstack.com/docs/api/useTable#column-options
// width is only used if explicitly passed in column.getHeaderProps
export const getColumns = () => [
  { Header: "Title", accessor: "name", width: 260 },
  { Header: "Time", accessor: "createdDate" },
  { Header: "Event Type", accessor: "eventType", width: 200 },
  { Header: "Status", accessor: "status", width: 120 },
  // numeric values should be right-aligned
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right",
    Cell: ({ value }) => `${value}%`,
  },
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
