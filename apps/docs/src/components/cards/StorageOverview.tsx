import { HvBarChart } from "@hitachivantara/uikit-react-viz";

import { Card } from "./Card";

export const StorageOverview = () => {
  return (
    <Card
      title="Storage Overview"
      subtitle="Monitor Data Utilization and Backup Across Departments"
    >
      <HvBarChart
        height={150}
        data={{
          Category: [
            "IT Operations",
            "Finance",
            "Marketing",
            "R&D",
            "Customer Support",
            "HR",
            "Legal",
            "Sales",
          ],
          StorageUsage: [
            1500,
            1200,
            850,
            1300,
            700,
            600,
            400,
            900, // In terabytes
          ],
          BackupCapacity: [
            500,
            300,
            200,
            350,
            150,
            120,
            100,
            250, // In terabytes
          ],
        }}
        groupBy="Category"
        measures={["StorageUsage", "BackupCapacity"]}
        stack="Total"
        onOptionChange={(option) => {
          option.legend = {
            show: false,
          };
          option.grid = {
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          };
          option.yAxis[0] = {
            ...option.yAxis[0],
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          };
          return option;
        }}
      />
    </Card>
  );
};
