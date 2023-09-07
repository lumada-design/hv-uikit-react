import useSWR from "swr";

import { ServerPaginationProps, useServerPagination, delay } from "../../hooks";
import { ListViewEntry, createEntry, getTrendData } from "./utils";

// --- Data ---

const TOTAL = 20;

const db = Array.from({ length: TOTAL }).reduce(
  (acc: ListViewEntry[], curr, i) => {
    acc.push(createEntry(i));
    return acc;
  },
  []
);

const countByStatus = (status: number) =>
  db.filter((entry) => entry.status === status).length || 0;

const requestsSummary = {
  success: {
    count: countByStatus(0),
    data: getTrendData("up"),
    variation: "up",
  },
  error: {
    count: countByStatus(1),
    data: getTrendData("down"),
    variation: "down",
  },
  open: {
    count: countByStatus(2),
    data: getTrendData("down"),
    variation: "down",
  },
  unassign: {
    count: countByStatus(3),
    data: getTrendData("up"),
    variation: "up",
  },
};

// --- Endpoints ---

export interface PaginationDataProps
  extends Omit<ServerPaginationProps<ListViewEntry>, "endpoint" | "db"> {}

export const usePaginationData = ({
  limit,
  skip,
  order,
  sort,
  filter,
  search,
}: PaginationDataProps) => {
  const data = useServerPagination<ListViewEntry>({
    endpoint: "/requests",
    db,
    limit,
    skip,
    sort,
    order,
    filter,
    search,
  });

  return data;
};

export const useSummaryData = () => {
  const { data, isLoading } = useSWR("/requests/summary", async () => {
    // Loading
    await delay(800);

    return requestsSummary;
  });

  return { data, loading: isLoading };
};
