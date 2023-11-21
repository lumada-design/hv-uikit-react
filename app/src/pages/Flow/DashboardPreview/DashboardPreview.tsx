import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { useSearchParams } from "react-router-dom";
import { HvGlobalActions, theme } from "@hitachivantara/uikit-react-core";
import {
  HvDashboard,
  HvDashboardItem,
  HvDashboardProps,
} from "@hitachivantara/uikit-react-lab";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

import {
  DASHBOARDS_STORAGE_KEY,
  DashboardSpecs,
  DashboardsStorage,
} from "../types";
import { renderItem } from "./Renderers";
import { NodeTypes } from "../Flow";

type DashboardConfig = Pick<
  HvDashboardProps<NodeTypes>,
  "items" | "layout" | "cols"
>;

const buildContent = (nodes?: DashboardSpecs["nodes"]) => {
  if (!nodes) return;

  return nodes.reduce<HvDashboardItem<NodeTypes>[]>((acc, node) => {
    if (node.type) {
      acc.push({ ...node, type: node.type as NodeTypes });
    }

    return acc;
  }, []);
};

const DashboardPreview = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const isMounted = useRef<boolean>(false);

  const [config, setConfig] = useState<DashboardConfig>();

  const buildDashboard = useCallback(
    (value: string | null) => {
      if (!id) return;

      const dashboards: DashboardsStorage = value
        ? JSON.parse(value)
        : undefined;
      const dashboard = dashboards?.[id];

      if (!dashboard) return;

      const { layout, nodes, cols } = dashboard;
      const items = buildContent(nodes);

      setConfig({ cols, layout, items });
    },
    [id]
  );

  const onStorageUpdate = useCallback(
    (e: StorageEvent) => {
      const { key, newValue } = e;

      if (key === DASHBOARDS_STORAGE_KEY) {
        buildDashboard(newValue);
      }
    },
    [buildDashboard]
  );

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);

      buildDashboard(value);
    }

    // Listen for updates
    window.addEventListener("storage", onStorageUpdate);

    return () => {
      // Unmount
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, [buildDashboard, onStorageUpdate]);

  return (
    <HvVizProvider>
      <div
        className={css({
          paddingTop: theme.space.lg,
          marginTop: `calc(-1 * (2 * ${theme.header.height} + ${theme.space.xs}))`,
        })}
      >
        <HvGlobalActions position="relative" title="Dashboard Preview" />
        {config?.items && config?.layout && (
          <HvDashboard
            {...config}
            renderItem={renderItem}
            rowHeight={120}
            margin={[16, 16]}
            containerPadding={[0, 16]}
            isDraggable={false}
            isResizable={false}
            useCSSTransforms={false}
          />
        )}
      </div>
    </HvVizProvider>
  );
};

export default DashboardPreview;
