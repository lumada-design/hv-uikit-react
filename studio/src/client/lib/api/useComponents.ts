import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useComponents = () => {
  const { data, error, isLoading } = useSWR(`/api/components`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};
