import {
  HvProgressBar,
  HvProgressBarStatus,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { Card } from "./Card";

const processingData = [
  { title: "Job 1", progress: 100, status: "completed" },
  { title: "Job 2", progress: 45, status: "inProgress" },
];

export const DataProcessing = () => {
  return (
    <Card
      title="Data Processing Status"
      subtitle="Monitor the performance of current data processing jobs."
    >
      {processingData.map(({ title, progress, status }, index) => (
        <div key={index} className="mb-3">
          <HvTypography variant="captionLabel">{title}</HvTypography>
          <HvProgressBar
            value={progress}
            status={status as HvProgressBarStatus}
          />
        </div>
      ))}
    </Card>
  );
};
