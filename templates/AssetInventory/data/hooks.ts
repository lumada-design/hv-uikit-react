import { ServerPaginationProps, useServerPagination } from "../../hooks";
import { AssetInventoryEntry, createEntry } from "./utils";

// --- Data ---

const TOTAL = 50;

const db = Array.from({ length: TOTAL }).reduce(
  (acc: AssetInventoryEntry[], curr, i) => {
    acc.push(createEntry(i));
    return acc;
  },
  []
);

// --- Endpoint ---

export interface PaginationDataProps
  extends Omit<ServerPaginationProps<AssetInventoryEntry>, "endpoint" | "db"> {}

export const usePaginationData = ({
  limit,
  skip,
  order,
  search,
  sort,
}: PaginationDataProps) => {
  const data = useServerPagination<AssetInventoryEntry>({
    endpoint: "/events",
    db,
    limit,
    skip,
    search,
    sort,
    order,
  });

  return data;
};
