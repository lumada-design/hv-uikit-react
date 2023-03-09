type Priority = "Low" | "High" | "Medium";

type NewEntry = {
  id: string;
  name: string;
  eventType: string;
  status: string;
  severity: string;
  priority: Priority;
  time: string;
  temperature: string;
};

const getOption = (opts: string[], i: number): string => opts[i % opts.length];

const getTime = (priority: Priority, index: number): string => {
  let i = priority === "High" ? index + 4 : index + 3;
  i = priority === "Medium" ? i + 30 : index + 20;
  return `${i % 12}:${i % 60}:${i % 60}`;
};

const getPriority = (i: number): Priority =>
  (i % 2 > 0 && "High") || (i % 2 < 0 && "Medium") || "Low";

const getNewEntry = (i: number): NewEntry => {
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

export const makeData = (len = 10): NewEntry[] => {
  const data: NewEntry[] = [];
  for (let i = 0; i <= len; i += 1) {
    data.push(getNewEntry(i));
  }
  return data;
};
