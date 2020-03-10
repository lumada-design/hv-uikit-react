import React from "react";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import HvCard from "@hv/uikit-react-core/dist/Card";
import {
  Tool,
  Level1,
  Level2Average,
  Level3Bad
} from "@hv/uikit-react-icons/dist";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import Grid from "@hv/uikit-react-core/dist/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  }
});

const data = {
  firstTitle: "Related assets",
  firstContent: "Primary asset to be worked on, other asset, other asset",
  secondTitle: "Description",
  secondContent:
    "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary."
};

const ThroughputKpiTextConfiguration = score => ({
  title: "Confidence score",
  indicator: `${score}%`
});

/* eslint react/prop-types: 0 */
const Content = ({ classes, value, icon }) => (
  <>
    <Grid container>
      <HvKpi
        labels={ThroughputKpiTextConfiguration(value)}
        visualIndicator={icon}
      />
    </Grid>
    <Grid container>
      <Grid item className={classes.item} xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        <HvTypography variant="normalText">{data.firstContent}</HvTypography>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        <HvTypography variant="normalText">{data.secondContent}</HvTypography>
      </Grid>
    </Grid>
  </>
);

const ContentWithStyles = withStyles(kpiStyles)(Content);

export default (
  <Grid container>
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <HvCard
        icon={<Tool />}
        headerTitle="Replace contaminated oil"
        innerCardContent={
          <ContentWithStyles value="85" icon={<Level1 semantic="sema2" />} />
        }
        semantic="sema2"
        isSelectable
        checkboxValue="value"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </Grid>
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <HvCard
        icon={<Tool />}
        headerTitle="Replace contaminated oil"
        innerCardContent={
          <ContentWithStyles
            value="45"
            icon={<Level2Average semantic="sema3" />}
          />
        }
        semantic="sema3"
        isSelectable
        checkboxValue="value"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </Grid>
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <HvCard
        icon={<Tool />}
        headerTitle="Replace contaminated oil"
        innerCardContent={
          <ContentWithStyles value="19" icon={<Level3Bad semantic="sema4" />} />
        }
        semantic="sema4"
        isSelectable
        checkboxValue="value"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </Grid>
  </Grid>
);
