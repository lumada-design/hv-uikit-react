import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { HvCard, HvTypography } from "@hitachivantara/uikit-react-core";
import { TopXS, BottomXS } from "@hitachivantara/uikit-react-icons";
import styles from "./styles";
import { getStatusIcon } from "./data";
import TrendIndicator from "./TrendIndicator";

/**
 * A KPI.
 *
 * @param {Object}   instance - Ttitle of the KPI.
 * @param {Integer}  count - The count of the KPI.
 * @param {String}   color - The color used on the KPI header bar.
 * @param {String}   variation - The value for the variation field.
 * @param {Integer}  status - The status of the KPI.
 * @param {Integer}  kpiSelection - The current KPI selection.
 * @param {Function} setKpiSelection -  A function to set the KPI selection.
 * @param {Object}   classes - The CSS classes object.
 */
const Kpi = ({
  title,
  count,
  color,
  variation,
  status,
  instance,
  kpiSelection,
  setKpiSelection,
  classes,
}) => {
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
      onClick={() => handleKpiClick(status, kpiSelection, instance, setKpiSelection)}
      className={clsx(classes.kpiCard, status === kpiSelection && classes.selected)}
      icon={getStatusIcon(status)}
    >
      <div className={classes.kpiContainer}>
        <HvTypography variant="highlightText">{title}</HvTypography>
        <div className={classes.kpiContent}>
          <HvTypography variant="lTitle" className={classes.kpiTitle}>
            {count}
          </HvTypography>
          <div className={classes.kpiVariation}>
            <TrendIndicator variation={variation} />
            {variation === "up" ? (
              <TopXS title="Up" semantic="sema1" />
            ) : (
              <BottomXS title="Up" semantic="sema4" />
            )}
            <div>
              <HvTypography variant="vizText">vs last 24h.</HvTypography>
            </div>
          </div>
        </div>
      </div>
    </HvCard>
  );
};

Kpi.propTypes = {
  /**
   * The instance object which contains all the data information and functions.
   */
  instance: PropTypes.object,
  /**
   * The title of the KPI.
   */
  title: PropTypes.string,
  /**
   * The text of the KPI.
   */
  count: PropTypes.number,
  /**
   * The color used on the KPI header bar.
   */
  color: PropTypes.string,
  /**
   * The value for the variation field.
   */
  variation: PropTypes.string,
  /**
   * The status of the KPI.
   */
  status: PropTypes.number,
  /**
   * The current KPI selection.
   */
  kpiSelection: PropTypes.number,
  /**
   * A function to set the KPI selection.
   */
  setKpiSelection: PropTypes.func,
  /**
   * The CSS Classes object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the KPI container.
     */
    kpiContainer: PropTypes.string,
    /**
     * Styles applied to the KPI card container.
     */
    kpiCard: PropTypes.string,
    /**
     * Styles applied to the KPI title section.
     */
    kpiTitle: PropTypes.string,
    /**
     * Styles applied to the KPI variation section.
     */
    kpiVariation: PropTypes.string,
    /**
     * Styles applied to the KPI content section.
     */
    kpiContent: PropTypes.string,
    /**
     * Styles applied to the KPI when it's selected.
     */
    selected: PropTypes.string,
  }),
};

export default withStyles(styles)(Kpi);
