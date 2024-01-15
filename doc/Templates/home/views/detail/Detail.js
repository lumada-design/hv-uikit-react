import React from "react";
import {
  HvTypography,
  HvGrid as Grid,
  HvKpi,
  HvLinechart as Linechart,
  HvBarchart as Barchart,
} from "@hitachivantara/uikit-react-core";
import { Level0Good as Good } from "@hitachivantara/uikit-react-icons";
import Table from "./table/Table";
import data from "../../data/tableInventoryData";
import getColumns from "../../configuration/tableConfiguration";
import dataLine from "../../configuration/lineChartConfiguration";
import dataBar from "../../configuration/barChartConfiguration";

const labels = {
  title: "Avg. service time",
  indicator: "124 14",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "10%",
};

const averageComparisonVisualAverage = (classes) => (
  <div className={classes.kpi}>
    <div className={classes.kpiInner} />
    <HvTypography className={classes.kpiTypography} variant="highlightText">
      {labels.comparisonIndicator}
    </HvTypography>
  </div>
);

const Detail = ({ classes }) => {
  const columns = getColumns();

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={4} lg={4} xl={4}>
        <HvKpi labels={labels} visualComparison={averageComparisonVisualAverage(classes)} />
      </Grid>
      <Grid item xs={1} sm={2} md={4} lg={4} xl={4}>
        <HvKpi labels={labels} visualIndicator={<Good semantic="sema1" />} />
      </Grid>
      <Grid item xs={1} sm={2} md={4} lg={4} xl={4}>
        <HvKpi labels={labels} />
      </Grid>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <Table data={data} columns={columns} title="Insights" />
      </Grid>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="mTitle" className={classes.title}>
          Insight
        </HvTypography>
        <Linechart
          title="Try to resize me from left to right."
          subtitle="You'll see that I'm learning hot to responsively behave. I can also transform into a another chart type."
          data={dataLine}
          xAxisTitle="2018"
          yAxisTitle="Thousands of Dollars ($)"
        />
      </Grid>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="mTitle" className={classes.title}>
          Story
        </HvTypography>
        <Barchart
          title="Try to resize me from left to right."
          subtitle="You'll see that I'm learning hot to responsively behave. I can also transform into a another chart type."
          data={dataBar}
          xAxisTitle="2018"
          yAxisTitle="Thousands of Dollars ($)"
        />
      </Grid>
    </Grid>
  );
};

export default Detail;
