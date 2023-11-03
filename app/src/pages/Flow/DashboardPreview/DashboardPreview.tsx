import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { useSearchParams } from "react-router-dom";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

import { Dashboard, DashboardLayout, DashboardProps } from "./Dashboard";
import { Dashboards } from "../types";
import { buildContent, buildLayout } from "./utils";

const DashboardPreview = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const isMounted = useRef<boolean>(false);

  const [content, setContent] = useState<DashboardProps["content"]>();
  const [layout, setLayout] = useState<DashboardLayout[]>();

  const buildDashboard = useCallback(
    (value: string | null) => {
      if (id) {
        const dashboards: Dashboards = value ? JSON.parse(value) : undefined;
        const dashboard = dashboards?.[id];

        if (dashboard) {
          const cnt = buildContent(dashboard);
          const ly = buildLayout(cnt, layout);

          setContent(cnt);
          setLayout(ly);
        }
      }
    },
    [id, layout]
  );

  const onStorageUpdate = useCallback(
    (e: StorageEvent) => {
      const { key, newValue } = e;

      if (key === "dashboards") {
        buildDashboard(newValue);
      }
    },
    [buildDashboard]
  );

  useEffect(() => {
    if (!isMounted.current) {
      const value = localStorage.getItem("dashboards");

      buildDashboard(value);
    }

    if (!isMounted.current) {
      isMounted.current = true;
    }

    // Listen for updates
    window.addEventListener("storage", onStorageUpdate);

    return () => {
      // Unmount
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, [buildDashboard, onStorageUpdate]);

  const handleLayoutChange: DashboardProps["onLayoutChange"] = (ly) => {
    setLayout(ly);
  };

  return (
    <HvVizProvider>
      <div
        className={css({
          paddingTop: theme.space.lg,
          marginTop: `calc(-1 * (2 * ${theme.header.height} + ${theme.space.xs}))`,
        })}
      >
        <Dashboard
          content={content}
          layout={layout}
          compactType={null}
          rowHeight={120}
          cols={12}
          margin={[16, 16]}
          preventCollision
          onLayoutChange={handleLayoutChange}
        />
      </div>
    </HvVizProvider>
  );
};

export default DashboardPreview;
