import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  HvLoading,
  HvQueryBuilder,
  HvQueryBuilderProps,
  HvQueryBuilderQuery,
} from "@hitachivantara/uikit-react-core";

const attributes: HvQueryBuilderProps["attributes"] = {
  price: {
    label: "Price",
    type: "numeric",
  },
  category: {
    label: "Category",
    type: "text",
  },
  in_stock: {
    label: "In stock",
    type: "boolean",
  },
  release: {
    label: "Release",
    type: "dateandtime",
  },
};

const initialQuery: HvQueryBuilderProps["value"] = {
  id: 1,
  combinator: "and",
  rules: [
    {
      id: 2,
      attribute: "price",
      operator: "lessThan",
      value: 10,
    },
  ],
};

const emptyQuery: HvQueryBuilderProps["value"] = {
  id: "1",
  combinator: "and",
  rules: [],
};

// ---- Simulates backend request for sample purposes
const delay = (ms = 500) =>
  new Promise((resolve) => {
    setTimeout(() => resolve("Time passed"), ms);
  });

const useQuery = () =>
  useSWR("/query", async () => {
    // Simulates loading
    await delay(1000);
    return initialQuery;
  });
// ----

export const Controlled = () => {
  const [query, setQuery] = useState<HvQueryBuilderProps["value"]>(undefined);

  const { data, isLoading } = useQuery();

  useEffect(() => {
    setQuery(data ?? emptyQuery);
  }, [data]);

  if (isLoading || !query) return <HvLoading />;

  return (
    <HvQueryBuilder
      attributes={attributes}
      value={query}
      onChange={(newQuery) => setQuery(newQuery as HvQueryBuilderQuery)}
      disableConfirmation
    />
  );
};
