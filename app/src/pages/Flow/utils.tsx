import { useCallback } from "react";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import useSWR from "swr";
import { NodeProps } from "reactflow";
import { loadArrow } from "arquero";

const datasets = [
  {
    id: "steelwheels",
    url: "/steelwheels",
    label: "Steelwheels",
    file: "steelwheels.arrow",
  },
];

export function useDatasets() {
  const fetcher = useCallback(async () => {
    const promises = datasets.map((dataset) =>
      // @ts-ignore
      loadArrow(`${import.meta.env.BASE_URL}datasets/${dataset.file}`)
    );

    const tables = await Promise.all(promises);

    return tables.map((table, idx) => {
      const { id, label, url } = datasets[idx];

      return {
        id,
        url,
        label,
        columns: table.columnNames(),
      };
    });
  }, []);

  const { data } = useSWR("/datasets", fetcher, { suspense: true });

  return {
    data,
  };
}

export function useData(endpoint: string) {
  const fetcher = useCallback(async (url: string) => {
    const filePath = datasets.find((dataset) => dataset.url === url)?.file;

    // @ts-ignore
    const data = await loadArrow(
      `${import.meta.env.BASE_URL}datasets/${filePath}`
    );

    return data;
  }, []);

  const { data, isLoading } = useSWR(endpoint, fetcher);

  return {
    loading: isLoading,
    data,
  };
}

export const createDataset = ({
  label,
  description,
  data,
}: {
  label: string;
  description: string;
  data: any;
}) => {
  const Dataset = (props: NodeProps) => {
    return <HvFlowNode description={description} {...props} />;
  };

  Dataset.meta = {
    label,
    groupId: "dataset",
    outputs: [{ label: "Dataset", isMandatory: true, provides: "dataset" }],
    data,
  };

  return Dataset;
};
