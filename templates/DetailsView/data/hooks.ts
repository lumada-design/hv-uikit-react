import useSWR from "swr";

import { ServerPaginationProps, delay, useServerPagination } from "../../utils";
import { DetailsViewEntry, createEntry } from "./utils";

// --- Data ---

const TOTAL = 10;

const db = Array.from({ length: TOTAL }).reduce(
  (acc: DetailsViewEntry[], curr, i) => {
    acc.push(createEntry(i));
    return acc;
  },
  []
);

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

// --- Endpoints ---

export interface PaginationDataProps
  extends Omit<ServerPaginationProps<DetailsViewEntry>, "endpoint" | "db"> {
  id: string;
}

export const usePaginationData = ({ limit, skip, id }: PaginationDataProps) => {
  const data = useServerPagination<DetailsViewEntry>({
    endpoint: `/model/${id}/events`,
    db,
    limit,
    skip,
  });

  return data;
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
