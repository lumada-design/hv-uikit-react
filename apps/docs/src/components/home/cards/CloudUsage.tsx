import { HvDonutChart } from "@hitachivantara/uikit-react-viz";

import { Card } from "./Card";

export const CloudUsage = () => {
  return (
    <Card
      title="Cloud Resource Usage"
      subtitle="Monitor cloud resource allocation and usage."
    >
      <HvDonutChart
        height={200}
        data={{
          Category: ["Compute", "Storage", "Networking"],
          Usage: [55, 30, 15], // in percentages
        }}
        measure="Usage"
        groupBy="Category"
        type="regular"
        onOptionChange={(option) => {
          option.legend = {
            show: false,
          };
          return option;
        }}
      />
    </Card>
  );
};
