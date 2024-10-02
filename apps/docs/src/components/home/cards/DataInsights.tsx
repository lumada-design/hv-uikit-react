import { HvTypography } from "@hitachivantara/uikit-react-core";

import { Card } from "./Card";

const data = [
  { title: "Complete", value: "75%" },
  { title: "Consistent", value: "81%" },
  { title: "Unique", value: "61%" },
];

export const DataInsights = () => (
  <Card
    title="Powerful Data Insights"
    media={<img src="/img/data-insights.png" alt="Data Quality Monitoring" />}
  >
    <HvTypography variant="label">Data Quality</HvTypography>
    <div className="mt-1 grid grid-cols-3 gap-sm justify-between">
      {data.map(({ title, value }, index) => (
        <div key={index}>
          <HvTypography variant="caption1" className="mb-1">
            {title}
          </HvTypography>
          <HvTypography variant="title2" className="text-primary">
            {value}
          </HvTypography>
        </div>
      ))}
    </div>
  </Card>
);
