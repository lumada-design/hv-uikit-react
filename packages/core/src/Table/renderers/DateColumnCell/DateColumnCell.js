import React, { useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { HvOverflowTooltip } from "../../..";

const HvDateColumnCell = ({ date, dateFormat }) => {
  const formattedDate = useMemo(() => {
    if (date) return dayjs(date).format(dateFormat !== "ISO8601" ? dateFormat : undefined);
    return "—";
  }, [date, dateFormat]);

  return <HvOverflowTooltip data={formattedDate} />;
};

HvDateColumnCell.propTypes = {
  /**
   * Date to render.
   */
  date: PropTypes.string,
  /**
   * The date's text representation format.
   */
  dateFormat: PropTypes.string,
};

export default HvDateColumnCell;
