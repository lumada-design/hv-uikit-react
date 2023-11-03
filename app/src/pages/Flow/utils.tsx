import { useCallback } from "react";
import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import useSWR from "swr";
import { NodeProps } from "reactflow";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const endpoints = {
  anomalies: {
    id: "anomalies",
    url: "/anomalies",
    label: "Anomalies",
    data: {
      Months: months,
      Anomalies: [182, 928, 194, 132, 782, 191, 293, 291, 495, 301, 283, 294],
    },
    columns: ["Months", "Anomalies"],
  },
  energyConsumption: {
    id: "energy-consumption",
    url: "/energy-consumption",
    label: "Energy consumption",
    data: {
      Months: months,
      Energy: [3.4, 2.3, 2.5, 3.4, 12.3, 2.4, 3.2, 4.3, 3.2, 3.4, 5.1, 2.6],
    },
    columns: ["Months", "Energy"],
  },
  sales: {
    id: "sales",
    url: "/sales",
    label: "Sales",
    data: {
      Semester: ["Semester 1", "Semester 2"],
      Total: [17282, 12922],
    },
    columns: ["Semester", "Total"],
  },
};

const delay = (ms = 500) =>
  new Promise((resolve) => {
    setTimeout(() => resolve("Time passed"), ms);
  });

export function useDatasets() {
  const fetcher = useCallback(async () => {
    // Loading
    await delay(800);

    return endpoints;
  }, []);

  const { data } = useSWR("/datasets", fetcher, { suspense: true });

  return {
    data,
  };
}

export function useData(endpoint: string) {
  const fetcher = useCallback(async (url: string) => {
    // Loading
    await delay(800);

    return Object.entries(endpoints).find((obj) => obj[1].url === url)?.[1]
      .data;
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
