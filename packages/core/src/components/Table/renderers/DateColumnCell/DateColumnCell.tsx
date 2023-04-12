import { useMemo } from "react";
import dayjs from "dayjs";
import { HvOverflowTooltip } from "~/components";

export interface HvDateColumnCellProp {
  /** The date's text representation format. */
  dateFormat?: string;
  /** Date to render. */
  date?: string;
}

const HvDateColumnCell = ({
  date,
  dateFormat,
}: HvDateColumnCellProp): JSX.Element => {
  const formattedDate = useMemo(() => {
    if (date)
      return dayjs(date).format(
        dateFormat !== "ISO8601" ? dateFormat : undefined
      );
    return "—";
  }, [date, dateFormat]);

  return <HvOverflowTooltip data={formattedDate} />;
};

export default HvDateColumnCell;
