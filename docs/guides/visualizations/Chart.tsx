import { HvLineChart } from "@hitachivantara/uikit-react-viz";

export const Chart = () => {
  return (
    <HvLineChart
      height={300}
      groupBy="Year"
      measures="Total"
      splitBy="Country"
      sortBy="Year"
      data={{
        Country: [
          "Portugal",
          "Portugal",
          "Spain",
          "Spain",
          "Portugal",
          "Portugal",
          "Spain",
          "Spain",
        ],
        Year: [2019, 2019, 2019, 2019, 2018, 2018, 2018, 2018],
        Medal: [
          "gold",
          "silver",
          "gold",
          "silver",
          "gold",
          "silver",
          "gold",
          "silver",
        ],
        Total: [3, 2, 1, 0, 4, 11, 8, 3],
      }}
    />
  );
};
