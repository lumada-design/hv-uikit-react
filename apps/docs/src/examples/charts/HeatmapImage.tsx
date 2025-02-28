import { HvHeatmap } from "@hitachivantara/uikit-react-viz";

import heatmapData from "./heatmapData";

export default function Demo() {
  const colors = [
    "transparent",
    "transparent",
    "transparent",
    "#FFFFCC11",
    "#FFFFCC77",
    "#FFFFCCAA",
    "#FFFF6677",
    "#FFFF66AA",
    "#FFFF66DD",
    "#FF9900AA",
    "#FF7700DD",
  ];
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <img
        src="https://t3.ftcdn.net/jpg/02/14/23/42/360_F_214234265_cw9c9yW4X04SNhoRyel1Kf9ZTEiqfKz7.jpg"
        width="640"
        alt="pitch"
        style={{ position: "absolute" }}
      />
      <HvHeatmap
        height={437}
        width={624}
        name="Match Statistics"
        data={heatmapData}
        xAxis={{ data: [] }}
        yAxis={{ data: [] }}
        min={0}
        max={1}
        colorScale={colors}
        onOptionChange={(option) => {
          option.series = {
            ...option.series[0],
            label: {
              show: false,
            },
            itemStyle: {
              borderWidth: 0,
            },
          };
          option.visualMap = {
            ...option.visualMap,
            realtime: false,
          };
          return option;
        }}
        tooltip={{
          show: false,
        }}
      />
    </div>
  );
}
