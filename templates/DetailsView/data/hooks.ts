import useSWR from "swr";

import { HvTagsInputProps } from "@hitachivantara/uikit-react-core";

import { ServerPaginationProps, delay, useServerPagination } from "../../hooks";
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

const model: ModelDetails = {
  description: "Model created from the example Jupyter Notebook",
  status: "Ready",
  tags: [{ label: "test" }, { label: "notebook" }],
  project: "Wine Quality",
  asc: "Failure Prediction",
  createdAt: "2022-05-24 14:32:50",
  createdBy: undefined,
  modifiedAt: "2022-05-24 14:32:50",
  modifiedBy: undefined,
  shortName: "LS",
  deploys: {
    summary: [
      { id: 1, title: "Sucess Requests", count: 4, diff: 2.02 },
      { id: 2, title: "Error Requests", count: 2, diff: -1.63 },
      { id: 3, title: "Open Requests", count: 12, diff: 1.84 },
    ],
    data: [
      {
        id: 1,
        title: "Review Log",
        value: "2019/6/4",
      },
      {
        id: 2,
        title: "Update Build",
        value: "2020/12/1",
      },
      {
        id: 3,
        title: "Clean Data Logs",
        value: "2018/5/3",
      },
      {
        id: 4,
        title: "Deploy Cloud Run",
        value: "Blone",
      },
      {
        id: 5,
        title: "Update Build",
        value: "2020/12/1	",
      },
      {
        id: 6,
        title: "Build",
        value: "46uYmU",
      },
    ],
  },
};

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

export interface ModelDetails {
  description?: string;
  status?: string;
  tags?: HvTagsInputProps["value"];
  project?: string;
  asc?: string;
  shortName?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  deploys?: {
    data: { id: number; title: string; value: string }[];
    summary: { id: number; title: string; count: number; diff: number }[];
  };
}

export const useModelData = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR<ModelDetails>(`/model/${id}`, async () => {
    // Loading
    await delay(800);

    return model;
  });

  return { data, loading: isLoading };
};
