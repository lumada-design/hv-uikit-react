import { css, cx } from "@emotion/css";
import {
  HvCard,
  HvTypography,
  HvLoading,
  HvCardProps,
  theme,
} from "@hitachivantara/uikit-react-core";
import { TopXS, BottomXS } from "@hitachivantara/uikit-react-icons";

import { Indicator } from "./Indicator";
import { AssetEvent, TrendData, getStatusIcon } from "./data";

const classes = {
  container: css({
    padding: theme.space.sm,
  }),
  card: css({
    cursor: "pointer",
    width: "100%",
    padding: 0,
    textAlign: "left",
  }),
  title: css({
    margin: `${theme.space.xs} 0`,
  }),
  content: css({
    display: "flex",
    alignItems: "center",
  }),
  variation: css({
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  selected: css({
    outline: `1px solid ${theme.colors.secondary_60}`,
  }),
  loading: css({
    margin: `${theme.space.xs} 0`,
  }),
};

interface KpiProps {
  title: string;
  count?: number;
  color: HvCardProps["statusColor"];
  variation?: string;
  status: AssetEvent["status"];
  selected?: boolean;
  onSelect: (status: AssetEvent["status"]) => void;
  trendData?: TrendData;
  loading?: boolean;
}

export const Kpi = ({
  title,
  count,
  color,
  variation,
  status,
  selected,
  trendData,
  loading,
  onSelect,
}: KpiProps) => {
  return (
    <HvCard
      selectable
      selected={selected}
      bgcolor="atmo1"
      statusColor={color}
      onClick={() => onSelect(status)}
      className={cx(classes.card, {
        [classes.selected]: selected,
      })}
      icon={getStatusIcon(status)}
      tabIndex={0}
    >
      <div className={classes.container}>
        <HvTypography variant="label">{title}</HvTypography>
        {loading ? (
          <HvLoading className={classes.loading} small />
        ) : (
          <div className={classes.content}>
            <HvTypography variant="title2" className={classes.title}>
              {count}
            </HvTypography>
            <div className={classes.variation}>
              <Indicator variation={variation} data={trendData} />
              {variation === "up" ? (
                <TopXS title="Up" color="positive" />
              ) : (
                <BottomXS title="Up" color="negative" />
              )}
              <div>
                <HvTypography variant="caption1">vs last 24h.</HvTypography>
              </div>
            </div>
          </div>
        )}
      </div>
    </HvCard>
  );
};
