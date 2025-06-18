import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Ticket } from "@hitachivantara/uikit-react-icons";
import { HvDonutChart } from "@hitachivantara/uikit-react-viz";

export default function Demo() {
  const data = {
    Country: ["Portugal", "Spain", "France", "Germany"],
    "Tickets Sold": [61829, 123948, 253792, 524638],
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <HvDonutChart
        height={300}
        data={data}
        groupBy="Country"
        measure="Tickets Sold"
        legend={{
          position: {
            y: "bottom",
            x: "center",
          },
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Ticket size="M" />
        <HvTypography variant="title3">
          {data["Tickets Sold"].reduce((acc, value) => acc + value, 0)}
        </HvTypography>
      </div>
    </div>
  );
}
