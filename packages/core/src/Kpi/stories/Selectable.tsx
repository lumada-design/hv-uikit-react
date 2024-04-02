import { useId, useState } from "react";
import ReactChart from "react-google-charts";
import { css } from "@emotion/css";
import { HvCard, HvTypography, theme } from "@hitachivantara/uikit-react-core";

const classes = {
  trendChartContainer: css({
    pointerEvents: "none",
    marginRight: -8,
    marginBottom: -1,
  }),
  card: css({
    width: 280,
    cursor: "pointer",
  }),
  title: css({
    padding: "0px 24px 8px 24px",
  }),
  time: css({
    color: theme.colors.secondary_80,
  }),
  trendTextContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: "4px",
  }),
  trendContainer: css({
    paddingTop: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  }),
  contentContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "12px 16px 22px 16px",
  }),
};

const TrendChart = () => (
  <div className={classes.trendChartContainer}>
    <ReactChart
      width="40px"
      height="30px"
      chartType="AreaChart"
      data={[
        ["Year", "Sales"],
        ["2019", 1200],
        ["2020", 2100],
        ["2021", 3200],
        ["2022", 3500],
      ]}
      options={{
        legend: "none",
        colors: ["red"],
        tooltip: {
          trigger: "none",
        },
        hAxis: {
          minValue: 0,
          maxValue: 10,
          gridlines: {
            color: "transparent",
          },
          baselineColor: "transparent",
        },
        backgroundColor: "transparent",
        vAxis: {
          gridlines: {
            color: "transparent",
          },
          baselineColor: "transparent",
        },
      }}
    />
  </div>
);

export const Selectable = () => {
  const [selected, setSelected] = useState(false);
  const titleId = useId();

  return (
    <HvCard
      className={classes.card}
      selectable
      selected={selected}
      onClick={() => setSelected(!selected)}
      tabIndex={0}
      role="button"
      aria-labelledby={titleId}
      onKeyDown={(event) => {
        if (event.code === "Enter" || event.code === "Space") {
          setSelected(!selected);
        }
      }}
      aria-pressed={selected}
      statusColor="negative"
    >
      <div className={classes.contentContainer}>
        <HvTypography
          id={titleId}
          component="h2"
          className={classes.title}
          variant="label"
        >
          Total number of events
        </HvTypography>
        <HvTypography component="div" variant="title2">
          508K
        </HvTypography>
        <div className={classes.trendContainer}>
          <TrendChart />
          <div className={classes.trendTextContainer}>
            <HvTypography variant="caption2">-42,15%</HvTypography>
            <HvTypography variant="caption2" className={classes.time}>
              Last 24h
            </HvTypography>
          </div>
        </div>
      </div>
    </HvCard>
  );
};
