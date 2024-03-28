import { useCallback } from "react";
import { loadArrow } from "arquero";
import useSWR from "swr";
import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import { DashboardSpecs, LAYOUT_COLS } from "./types";

export const datasets = [
  {
    id: "steelwheels",
    url: "https://lumada-design.github.io/assets/steelwheels.arrow",
    label: "Steelwheels",
  },
];

export const useDatasets = () => {
  const fetcher = useCallback(async () => {
    const promises = datasets.map(async (dataset) => {
      // @ts-ignore
      return loadArrow(dataset.url);
    });

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
};

export const createDataset = ({
  label,
  description,
  data,
}: {
  label: string;
  description: string;
  data: any;
}) => {
  const Dataset: HvFlowNodeFC = (props) => {
    return (
      <HvFlowNode
        outputs={[{ label: "Dataset", isMandatory: true, provides: "dataset" }]}
        description={description}
        {...props}
      />
    );
  };

  Dataset.meta = {
    label,
    groupId: "dataset",
    data,
  };

  return Dataset;
};

export const buildLayout = (
  items: DashboardSpecs["items"],
  layout?: DashboardSpecs["layout"],
) => {
  return items.map((node, idx) => {
    const item = layout?.find((x) => x.i === node.id);

    if (item) {
      return item;
    }

    const w = 4;
    const h = 3;
    const perRow = LAYOUT_COLS / w;

    const maxY = layout ? Math.max(...layout.map((x) => x.y)) : undefined;
    const maxX =
      maxY != null && layout
        ? Math.max(...layout.filter((x) => x.y === maxY).map((x) => x.x))
        : undefined;
    const lastItem = layout?.find((x) => x.x === maxX && x.y === maxY);
    const newLine = lastItem
      ? LAYOUT_COLS - (lastItem.x + lastItem.w) < w
      : undefined;

    return {
      i: node.id,
      w,
      h: node.type === "kpi" ? 1 : h,
      x:
        newLine != null && lastItem
          ? newLine
            ? 0
            : lastItem.x + lastItem.w
          : (idx * w) % LAYOUT_COLS,
      y:
        newLine != null && lastItem
          ? newLine
            ? lastItem.y + h
            : lastItem.y
          : Math.floor(idx / perRow) * h,
    };
  });
};
