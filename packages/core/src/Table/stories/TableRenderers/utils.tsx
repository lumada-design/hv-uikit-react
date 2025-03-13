import {
  HvEmptyState,
  HvTableCell,
  HvTableRow,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

export const EmptyRow = ({ height }: React.CSSProperties) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message="No data to display" icon={<Ban />} />
    </HvTableCell>
  </HvTableRow>
);

export interface NewRendererEntry {
  id: string;
  name: string;
  createdDate?: string;
  eventType?: string;
  riskScore: number;
  status: {
    status_name?: string;
    status_color?: string;
    status_text_color?: string;
  };
  severity?: {
    id?: string;
    label?: string;
    selected?: boolean;
  }[];
  isDisabled: boolean;
  eventQuantity?: number;
}

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const generateLongString = (value: string | undefined, i: number) =>
  i === 6
    ? "very long string that should be cut if it doesn't fit in the column"
    : value;

const getDropdownOptions = (options: string[] = [], selected = "") => {
  return options.map((option, index) => ({
    id: `${option}-${index}`,
    label: option,
    selected: selected === option,
  }));
};

const severities = ["Critical", "Major", "Average", "Minor"];
const newRendererEntry = (i: number): NewRendererEntry => {
  return {
    id: `${i + 1}`,
    name: `Event ${i + 1}`,
    createdDate:
      i === 7 ? undefined : new Date("2020-03-20").toISOString().slice(0, 10),
    eventQuantity: i === 6 ? undefined : i,
    eventType: generateLongString(i === 3 ? undefined : "Anomaly detection", i),
    status: {
      status_name: getOption(["Closed", "Open"], i),
      status_color: getOption(["negative_20", "positive_20"], i),
    },
    riskScore: (i % 100) + 1,
    isDisabled: i % 3 === 0,
    severity: getDropdownOptions(severities, getOption(severities, i)),
  };
};

export const makeRenderersData = (len = 10) =>
  [...Array(len).keys()].map(newRendererEntry);
