import { HvTypography } from "@hitachivantara/uikit-react-core";
import { BottomXS, TopXS } from "@hitachivantara/uikit-react-icons";

import { Card } from "./Card";

interface ItemProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean | null;
}

const data = [
  { title: "MRR", value: "$500K", percentage: "5.0", isPositive: true },
  { title: "OpEx", value: "$320K", percentage: "8.5", isPositive: false },
  { title: "GPM", value: "48.3%", percentage: "2.1", isPositive: true },
  { title: "NPM", value: "12.5%", percentage: "0.8", isPositive: true },
];

const Item = ({ title, value, percentage, isPositive }: ItemProps) => {
  const percentageColor = isPositive ? "text-positive" : "text-negative";

  return (
    <div>
      <div className="flex items-center">
        <HvTypography variant="caption1">{title}</HvTypography>
        {isPositive && <TopXS color="positive" />}
        {!isPositive && <BottomXS color="negative" />}
        <HvTypography className={percentageColor}>{percentage}%</HvTypography>
      </div>
      <HvTypography variant="title2">{value}</HvTypography>
    </div>
  );
};

export const FinancialPerformance = () => {
  return (
    <Card
      title="Financial Performance"
      subtitle="Company’s KPIs from the last 12 months."
    >
      <div className="grid grid-cols-2 gap-1 justify-between">
        {data.map((value) => (
          <Item key={value.title} {...value} />
        ))}
      </div>
    </Card>
  );
};
