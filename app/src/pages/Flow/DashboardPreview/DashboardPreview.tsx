import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { useSearchParams } from "react-router-dom";
import { HvGlobalActions, theme } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

import { Dashboard, DashboardProps } from "../Dashboard";
import { buildContent } from "./utils";
import { DASHBOARDS_STORAGE_KEY, DashboardsStorage } from "../types";

const DashboardPreview = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const isMounted = useRef<boolean>(false);

  const [config, setConfig] = useState<{
    content?: DashboardProps["content"];
    layout?: DashboardProps["layout"];
    cols?: number;
  }>();

  const buildDashboard = useCallback(
    (value: string | null) => {
      if (id) {
        const dashboards: DashboardsStorage = value
          ? JSON.parse(value)
          : undefined;
        const dashboard = dashboards?.[id];

        if (dashboard) {
          const { layout, nodes, layoutCols } = dashboard;

          const content = buildContent(nodes);

          setConfig({
            layout,
            content,
            cols: layoutCols,
          });
        }
      }
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
        {config?.content && config?.layout && (
          <Dashboard
            content={config.content}
            layout={config.layout}
            rowHeight={120}
            cols={config?.cols}
            margin={[16, 16]}
            containerPadding={[16, 16]}
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
