import useSWR from "swr";

import { fetcher } from "./fetcher";

export const useComponents = () => {
  const { data, error, isLoading } = useSWR(`/api/components`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};
