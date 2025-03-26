import { HvTag, HvTypography } from "@hitachivantara/uikit-react-core";
import { SystemActivity } from "@hitachivantara/uikit-react-icons";

import { Card } from "./Card";

const securityData = [
  { title: "Critical", count: 5, color: "positive_20" },
  { title: "Warning", count: 12, color: "negative_20" },
  { title: "Informational", count: 20, color: "warning_20" },
];

export const DataSecurity = () => {
  return (
    <Card
      title="Data Security Overview"
      subtitle="Incidents from the last 30 days."
      icon={<SystemActivity color="primary" />}
    >
      <div className="grid grid-cols-3">
        {securityData.map(({ title, count, color }) => (
          <div key={title}>
            <HvTypography variant="captionLabel" className="mb-xs">
              {title}
            </HvTypography>
            <HvTag label={count.toString()} color={color} className="w-48px" />
          </div>
        ))}
      </div>
    </Card>
  );
};
