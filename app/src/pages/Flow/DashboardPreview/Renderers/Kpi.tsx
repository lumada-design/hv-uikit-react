import { useMemo } from "react";
import { css } from "@emotion/css";
import type ColumnTable from "arquero/dist/types/table/column-table";
import {
  HvCard,
  HvLoading,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

interface KpiProps {
  loading: boolean;
  aggregation?: string;
  title?: string;
  measure?: string;
  data?: ColumnTable;
  unit?: string;
}

export const Kpi = ({
  loading,
  title,
  data,
  measure,
  unit,
  aggregation,
}: KpiProps) => {
  const count = useMemo(() => {
    if (data && measure && aggregation) {
      const tb = data.rollup({ total: `${aggregation}(d["${measure}"])` });

      return tb.get("total");
    }
  }, [aggregation, data, measure]);

  return (
    <HvCard className={css({ width: "100%" })} bgcolor="atmo1">
      {loading ? (
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: theme.space.sm,
          })}
        >
          <HvLoading small />
        </div>
      ) : (
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            padding: theme.space.sm,
            wordBreak: "break-word",
            flexWrap: "wrap",
          })}
        >
          <HvTypography
            className={css({
              padding: theme.spacing(0, "sm", "xs", 0),
            })}
            variant="label"
          >
            {title}
          </HvTypography>
          {count != null && (
            <HvTypography variant="title2">
              {count} {unit}
            </HvTypography>
          )}
        </div>
      )}
    </HvCard>
  );
};
