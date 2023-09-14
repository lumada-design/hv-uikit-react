import { clsx } from "clsx";
import {
  HvCard,
  HvTypography,
  HvAtmosphereColorKeys,
  HvSemanticColorKeys,
  HvLoading,
  HvTableInstance,
} from "@hitachivantara/uikit-react-core";
import { TopXS, BottomXS } from "@hitachivantara/uikit-react-icons";

import { Indicator } from "../Indicator";
import { ListViewEntry, TrendData, getStatusIcon } from "../data";
import classes from "./styles";

interface KpiProps {
  title: string;
  count?: number;
  color: HvAtmosphereColorKeys | HvSemanticColorKeys | "sema0" | undefined;
  variation?: string;
  status: number;
  instance: HvTableInstance<ListViewEntry, string>;
  kpiSelection: number | undefined;
  setKpiSelection: (value: number | undefined) => void;
  trendData?: TrendData;
  loading?: boolean;
}

export const Kpi = ({
  title,
  count,
  color,
  variation,
  status,
  instance,
  kpiSelection,
  trendData,
  loading,
  setKpiSelection,
}: KpiProps) => {
  const handleKpiClick = () => {
    setKpiSelection(status);
    if (status !== kpiSelection) {
      instance?.setFilter?.("status", `${status}`);
    } else {
      instance?.setFilter?.("status", "");
      setKpiSelection(undefined);
    }
  };

  return (
    <HvCard
      id={`kpi${status}`}
      selectable
      selected={status === kpiSelection}
      bgcolor="atmo1"
      statusColor={color}
      onClick={() => handleKpiClick()}
      className={clsx(
        classes.card,
        status === kpiSelection && classes.selected
      )}
      icon={getStatusIcon(status)}
      tabIndex={0}
      component="button"
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
