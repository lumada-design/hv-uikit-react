import { useMemo } from "react";
import { css } from "@emotion/css";
import { table, op } from "arquero";
import {
  HvCard,
  HvLoading,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

interface TotalProps {
  loading: boolean;
  title?: string;
  measure?: string;
  data?: Record<string | number, (string | number)[]>;
  unit?: string;
}

export const Total = ({ loading, title, data, measure, unit }: TotalProps) => {
  const count = useMemo(() => {
    if (data && measure) {
      const tb = table(data).rollup({ total: op.sum(measure) });

      return tb.get("total");
    }
  }, [data, measure]);

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
