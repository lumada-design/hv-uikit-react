import range from "lodash/range";

const getOption = (opts, i) => opts[i % opts.length];
const getTime = (priority, index) => {
  let i = priority === "High" ? index + 4 : index + 3;
  i = priority === "Medium" ? i + 30 : index + 20;
  return {
    hours: i % 12,
    minutes: i % 60,
    seconds: i % 60,
  };
};
const getPriority = (i) =>
  (i % 2 > 0 && "High") || (i % 2 < 0 && "Medium") || "Low";

const newEntry = (i) => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    eventType: `Anomaly detection ${i % 4}`,
    status: getOption(["Closed", "Open"], i),
    severity: getOption(["Critical", "Major", "Average", "Minor"], i),
    priority: getPriority(i),
    time: getTime(getPriority(i), i),
    temperature: `${i + 35}`,
  };
};

export const makeData = (len = 10) => range(len).map(newEntry);

export const getColumns = () => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Time", accessor: "time" },
  { Header: "Temperature", accessor: "temperature" },
];
