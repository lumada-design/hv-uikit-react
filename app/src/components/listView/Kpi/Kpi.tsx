import { clsx } from "clsx";
import {
  HvCard,
  HvTypography,
  HvAtmosphereColorKeys,
  HvSemanticColorKeys,
} from "@hitachivantara/uikit-react-core";
import { TopXS, BottomXS } from "@hitachivantara/uikit-react-icons";

import { Indicator } from "~/components/listView/Indicator";
import { getStatusIcon } from "~/lib/utils/listView";

interface KpiProps {
  title: string;
  count: number;
  color: HvAtmosphereColorKeys | HvSemanticColorKeys | "sema0" | undefined;
  variation: string;
  status: number;
  instance: any;
  kpiSelection: number | undefined;
  setKpiSelection: (value: number | undefined) => void;
}

/**
 * A KPI.
 *
 * @param {Object}   instance - Title of the KPI.
 * @param {Integer}  count - The count of the KPI.
 * @param {String}   color - The color used on the KPI header bar.
 * @param {String}   variation - The value for the variation field.
 * @param {Integer}  status - The status of the KPI.
 * @param {Integer}  kpiSelection - The current KPI selection.
 * @param {Function} setKpiSelection -  A function to set the KPI selection.
 * @param {Object}   classes - The CSS classes object.
 */
export const Kpi = ({
  title,
  count,
  color,
  variation,
  status,
  instance,
  kpiSelection,
  setKpiSelection,
}: KpiProps) => {
  /**
   * KPI click handler.
   */
  const handleKpiClick = () => {
    setKpiSelection(status);
    if (status !== kpiSelection) {
      instance.setFilter("status", `${status}`);
    } else {
      instance.setFilter("status", "");
      setKpiSelection(undefined);
    }
  };

  return (
    <HvCard
      id={`kpi${status}`}
      selectable
      bgcolor="atmo1"
      statusColor={color}
      onClick={() => handleKpiClick()}
      className={clsx(
        "cursor-pointer",
        status === kpiSelection && "outline-secondary_60"
      )}
      icon={getStatusIcon(status)}
    >
      <div className="p-sm">
        <HvTypography variant="label">{title}</HvTypography>
        <div className="flex items-center">
          <HvTypography variant="title2" className="my-xs">
            {count}
          </HvTypography>
          <div className="flex flex-1 items-center justify-end">
            <Indicator variation={variation} />
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
      </div>
    </HvCard>
  );
};
