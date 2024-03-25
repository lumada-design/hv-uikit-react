import useSWR from "swr";
import { HvTableColumnConfig } from "@hitachivantara/uikit-react-core";

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export type AssetEvent = {
  id: string;
  name: string;
  createdAt: string;
  eventType: string;
  riskScore: number;
  status?: "Open" | "Pending" | "Closed";
  severity?: "Critical" | "Major" | "Average" | "Minor";
  priority?: "High" | "Medium" | "Low";
  temperature: number;
  imageUrl: string;
};

export const getColumns = (): HvTableColumnConfig<AssetEvent, string>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Time", accessor: "createdAt" },
  { Header: "Temperature", accessor: "temperature" },
];

// --- Data ---
const model = {
  description: "Model created from the example Jupyter Notebook",
  status: "Critical",
  severity: "Medium",
  tags: ["test", "note"],
  project: "Wine Quality",
  progress: 0.87,
  risk: 0.2,
  asc: "Failure Prediction",
  createdAt: "2022-05-24 14:32:50",
  modifiedAt: "2022-05-24 14:32:50",
  imageUrl: "https://i.imgur.com/5EW6x5r.jpg",
  deploys: {
    summary: [
      { id: 1, title: "Success Requests", count: 4, diff: 2.02 },
      { id: 2, title: "Error Requests", count: 2, diff: -1.63 },
      { id: 3, title: "Open Requests", count: 12, diff: 1.84 },
    ],
    data: [
      { id: 2, title: "Update Build", value: "2020/12/1" },
      { id: 3, title: "Clean Data Logs", value: "2018/5/3" },
      { id: 6, title: "Build", value: "46uYmU" },
    ],
  },
};

export type ModelDetails = typeof model;

// #region Endpoints

export interface AssetDataParams {
  take: number;
  skip: number;
}

export const useAssetData = (props: AssetDataParams) => {
  return useSWR<{ items: AssetEvent[]; total: number }>(
    ["assets", props],
    async () => {
      const params = new URLSearchParams(props as any);
      const url = `https://assets-mock-api.deno.dev/assets?${params}`;
      await delay(800);
      return fetch(url).then((res) => res.json());
    },
    { suspense: true }
  );
};

export const useModelData = () => {
  return useSWR(
    "model",
    async () => {
      // Loading
      await delay(800);

      return model;
    },
    { suspense: true }
  );
};
// #endregion
